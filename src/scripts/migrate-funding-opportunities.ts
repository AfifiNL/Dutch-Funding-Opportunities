import { mockFundingData } from '@/data/fundingOpportunities';
import { supabase } from '@/utils/supabase';
import { IFundingOpportunity } from '@/features/funding-display/types';

/**
 * Converts an IFundingOpportunity object to the database format 
 * required for insertion into the funding_opportunities table
 */
function convertToDbFormat(opportunity: IFundingOpportunity) {
  // Convert details to the right format for database
  let details = opportunity.details;
  
  // Return object with snake_case keys for database
  return {
    id: opportunity.id,
    title: opportunity.title,
    fund_provider: opportunity.fundProvider,
    sector: opportunity.sector,
    amount_description: opportunity.amountDescription,
    amount_min: opportunity.amountMin || null,
    amount_max: opportunity.amountMax || null,
    location: opportunity.location,
    description: opportunity.description,
    relevant_links: opportunity.relevantLinks || [],
    display_type: opportunity.displayType || 'default',
    image_url: opportunity.imageUrl || null,
    equity: opportunity.equity || null,
    program_support: opportunity.programSupport || false,
    details: details || null,
    is_early_stage: opportunity.sector.toLowerCase().includes('early') || 
                    opportunity.title.toLowerCase().includes('early') ||
                    opportunity.description.toLowerCase().includes('early stage'),
    is_impact_focused: opportunity.sector.toLowerCase().includes('impact') || 
                       opportunity.title.toLowerCase().includes('impact') ||
                       opportunity.description.toLowerCase().includes('sustainability') ||
                       opportunity.description.toLowerCase().includes('climate'),
    funding_type: deriveFundingType(opportunity)
  };
}

/**
 * Derives the funding type from the opportunity data
 */
function deriveFundingType(opportunity: IFundingOpportunity): string {
  // Check the sector field first
  const sector = opportunity.sector.toLowerCase();
  if (sector.includes('public grant')) return 'grant';
  if (sector.includes('private')) return 'private';
  if (sector.includes('accelerator')) return 'accelerator';
  if (sector.includes('incubator')) return 'incubator';
  if (sector.includes('eu program')) return 'eu_program';
  
  // Check title next
  const title = opportunity.title.toLowerCase();
  if (title.includes('grant') || title.includes('subsidy')) return 'grant';
  if (title.includes('fund') || title.includes('capital')) return 'private';
  if (title.includes('accelerator')) return 'accelerator';
  if (title.includes('incubator')) return 'incubator';
  
  // Check equity as fallback
  if (opportunity.equity && opportunity.equity.toLowerCase() !== 'no') return 'private';
  
  // Default case
  return 'other';
}

/**
 * Validates funding opportunity data before migration
 */
function validateOpportunity(opportunity: IFundingOpportunity): { valid: boolean; issues: string[] } {
  const issues: string[] = [];
  
  if (!opportunity.id) issues.push('Missing ID');
  if (!opportunity.title) issues.push('Missing title');
  if (!opportunity.fundProvider) issues.push('Missing fund provider');
  if (!opportunity.sector) issues.push('Missing sector');
  if (!opportunity.amountDescription) issues.push('Missing amount description');
  if (!opportunity.location) issues.push('Missing location');
  if (!opportunity.description) issues.push('Missing description');
  
  return {
    valid: issues.length === 0,
    issues
  };
}

/**
 * Migrates mock funding opportunity data to Supabase
 */
async function migrateFundingOpportunities() {
  console.log(`Starting migration of ${mockFundingData.length} funding opportunities...`);

  // Validate opportunities before migration
  const validationResults = mockFundingData.map(opportunity => ({
    opportunity,
    validation: validateOpportunity(opportunity)
  }));
  
  const invalidOpportunities = validationResults.filter(r => !r.validation.valid);
  if (invalidOpportunities.length > 0) {
    console.warn(`Found ${invalidOpportunities.length} opportunities with validation issues:`);
    invalidOpportunities.forEach(({ opportunity, validation }) => {
      console.warn(`- ${opportunity.id} (${opportunity.title}): ${validation.issues.join(', ')}`);
    });
    
    const shouldContinue = process.env.FORCE_MIGRATION === 'true' || 
                           await confirm('Continue with migration despite validation issues? (y/n)');
    if (!shouldContinue) {
      console.log('Migration aborted by user.');
      return;
    }
  }
  
  // Convert all opportunities to database format
  const dbOpportunities = mockFundingData.map(convertToDbFormat);
  
  // Split into batches to avoid request size limitations
  const BATCH_SIZE = 10;
  const batches = [];
  
  for (let i = 0; i < dbOpportunities.length; i += BATCH_SIZE) {
    batches.push(dbOpportunities.slice(i, i + BATCH_SIZE));
  }
  
  console.log(`Splitting data into ${batches.length} batches...`);
  
  // Process each batch
  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;
  let errorDetails: Array<{id: string, error: any}> = [];

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`Processing batch ${i + 1} of ${batches.length} (${batch.length} records)...`);
    
    try {
      // Use upsert to avoid duplicates (update if id exists, insert if not)
      const { data, error, count } = await supabase
        .from('funding_opportunities')
        .upsert(batch, { 
          onConflict: 'id',
          ignoreDuplicates: false
        });
      
      if (error) {
        console.error(`Error in batch ${i + 1}:`, error);
        errorCount += batch.length;
        errorDetails.push(...batch.map(item => ({ id: item.id, error })));
      } else {
        console.log(`Batch ${i + 1} completed successfully.`);
        successCount += batch.length;
        
        // Log the count if returned from Supabase
        if (count !== null) {
          console.log(`Records affected: ${count}`);
          // If count is less than batch.length, some records were skipped
          if (count < batch.length) {
            skippedCount += (batch.length - count);
          }
        }
      }
    } catch (err) {
      console.error(`Exception in batch ${i + 1}:`, err);
      errorCount += batch.length;
      errorDetails.push(...batch.map(item => ({ id: item.id, error: err })));
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('Migration completed!');
  console.log(`${successCount} records processed successfully.`);
  console.log(`${skippedCount} records skipped (likely duplicates).`);
  console.log(`${errorCount} records encountered errors.`);
  
  if (errorDetails.length > 0) {
    console.log('Error details:');
    errorDetails.forEach(({ id, error }) => {
      console.log(`- ID ${id}: ${error.message || JSON.stringify(error)}`);
    });
  }
}

// Helper function for Node.js CLI prompts
async function confirm(message: string): Promise<boolean> {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise<boolean>(resolve => {
    readline.question(`${message} `, (answer: string) => {
      readline.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

// Only run the migration if executed directly
if (require.main === module) {
  migrateFundingOpportunities()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
} else {
  console.log('This script can be imported or run directly.');
}

export { migrateFundingOpportunities, convertToDbFormat, validateOpportunity }; 
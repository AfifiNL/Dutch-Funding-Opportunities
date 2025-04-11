#!/usr/bin/env python3
import csv
import json
import re
import uuid
import os
from urllib.parse import urlparse
import markdown
from bs4 import BeautifulSoup

# Set input file paths
WEBSITE_LINKS_CSV = "Fund-data/Website-Links.csv"
ANTLER_PORTFOLIO_CSV = "Fund-data/antler_portfolio2.csv"
VC_NL_MD = "Fund-data/venture capital-NL.md"
ANTLER_MD = "Fund-data/antler.md"

# Set output SQL file path
OUTPUT_SQL = "fund_data_import.sql"

# Function to generate UUIDs
def generate_uuid():
    return str(uuid.uuid4())

# Function to clean and extract domain name from URL
def extract_company_from_url(url):
    try:
        # Parse URL and extract domain
        parsed_url = urlparse(url)
        domain = parsed_url.netloc
        
        # Remove www. if present
        if domain.startswith('www.'):
            domain = domain[4:]
        
        # Extract the main part of the domain (before the extension)
        company_name = domain.split('.')[0]
        
        # Format company name (capitalize words, replace hyphens with spaces)
        company_name = ' '.join(word.capitalize() for word in company_name.split('-'))
        return company_name, url
    except:
        return None, url

# Function to parse Website-Links.csv
def parse_website_links(file_path):
    vc_data = []
    
    with open(file_path, 'r') as file:
        # Skip header if it exists
        if 'url' in file.readline().lower():
            start_line = 1
        else:
            start_line = 0
            file.seek(0)
        
        # Read URLs
        reader = csv.reader(file)
        for i, row in enumerate(reader):
            if i < start_line:
                continue
            
            if row and row[0].strip():
                url = row[0].strip()
                company_name, cleaned_url = extract_company_from_url(url)
                
                if company_name:
                    vc_id = generate_uuid()
                    random_index = hash(company_name) % 99
                    vc_data.append({
                        'id': vc_id,
                        'company_name': company_name,
                        'full_name': f"{company_name} Ventures",
                        'email': f"contact@{company_name.lower().replace(' ', '')}.example.com",  # Placeholder
                        'website_url': cleaned_url,
                        'user_type': 'investor',
                        'avatar_url': f"https://randomuser.me/api/portraits/men/{random_index}.jpg"
                    })
    
    return vc_data

# Function to parse antler_portfolio2.csv
def parse_antler_portfolio(file_path):
    portfolio_companies = []
    
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            # Clean and format the data
            company = {
                'company_name': row.get('Company Name', '').strip(),
                'year': row.get('Year', '').strip(),
                'location': row.get('Location', '').strip(),
                'sector': row.get('Sector', '').strip(),
                'website': row.get('Website', '').strip(),
                'description': row.get('Description', '').strip()
            }
            
            # Only add companies with a name
            if company['company_name']:
                portfolio_companies.append(company)
    
    return portfolio_companies

# Function to extract VC data from MD files
# Note: This is a simplified version that extracts basic info
# For real MD files, you would need to implement more sophisticated parsing
def parse_markdown_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
            
        # Convert Markdown to HTML
        html = markdown.markdown(content)
        soup = BeautifulSoup(html, 'html.parser')
        
        # Extract text content
        text_content = soup.get_text()
        
        # Extract VC name (assuming it's the first heading)
        vc_name = soup.find(['h1', 'h2', 'h3']).text if soup.find(['h1', 'h2', 'h3']) else os.path.basename(file_path).split('.')[0]
        
        # Try to extract description (simplified)
        description_match = re.search(r'(?:about|description|overview):(.*?)(?:\n\n|\n#)', text_content, re.IGNORECASE | re.DOTALL)
        description = description_match.group(1).strip() if description_match else "Investment firm focused on innovative companies."
        
        # Try to extract investment thesis (simplified)
        thesis_match = re.search(r'(?:investment thesis|thesis|approach|strategy):(.*?)(?:\n\n|\n#)', text_content, re.IGNORECASE | re.DOTALL)
        thesis = thesis_match.group(1).strip() if thesis_match else "Investing in innovative technology companies with high growth potential."
        
        # Try to extract sectors/industries
        sectors_match = re.search(r'(?:sectors|industries|focus areas):(.*?)(?:\n\n|\n#)', text_content, re.IGNORECASE | re.DOTALL)
        sectors_text = sectors_match.group(1).strip() if sectors_match else "Technology, Software, Consumer"
        sectors = [s.strip() for s in re.split(r'[,;]', sectors_text)]
        
        # Try to extract investment stages
        stages_match = re.search(r'(?:stages|investment stages|phase):(.*?)(?:\n\n|\n#)', text_content, re.IGNORECASE | re.DOTALL)
        stages_text = stages_match.group(1).strip() if stages_match else "Seed, Series A"
        stages = [s.strip() for s in re.split(r'[,;]', stages_text)]
        
        # Try to extract investment size
        size_match = re.search(r'(?:ticket size|investment size|check size):(.*?)(?:\n\n|\n#|€|k|\$)', text_content, re.IGNORECASE | re.DOTALL)
        min_size = 100000
        max_size = 1000000
        if size_match:
            size_text = size_match.group(1).strip()
            # Try to extract numbers
            numbers = re.findall(r'\d+(?:,\d+)*(?:\.\d+)?', size_text)
            if len(numbers) >= 2:
                min_size = int(numbers[0].replace(',', '')) * 1000  # Assuming numbers are in K
                max_size = int(numbers[1].replace(',', '')) * 1000
            elif len(numbers) == 1:
                avg_size = int(numbers[0].replace(',', '')) * 1000
                min_size = avg_size // 2
                max_size = avg_size * 3 // 2
        
        # Generate avatar URL - use randomuser.me for placeholder avatars
        random_index = hash(vc_name) % 99  # Use hash of name to get a consistent but random-looking index
        avatar_url = f"https://randomuser.me/api/portraits/men/{random_index}.jpg"
        
        # Structure the data
        vc_data = {
            'id': generate_uuid(),
            'company_name': vc_name,
            'full_name': vc_name,
            'email': f"contact@{vc_name.lower().replace(' ', '')}.example.com",  # Placeholder
            'bio': description,
            'user_type': 'investor',
            'avatar_url': avatar_url,
            'investment_thesis': thesis,
            'investment_stages': stages,
            'preferred_industries': sectors,
            'investment_sizes': {
                'min': min_size,
                'max': max_size,
                'currency': 'EUR'
            }
        }
        
        return vc_data
        
    except Exception as e:
        print(f"Error parsing {file_path}: {e}")
        # Return a basic template if parsing fails
        company_name = os.path.basename(file_path).split('.')[0]
        random_index = hash(company_name) % 99
        return {
            'id': generate_uuid(),
            'company_name': company_name,
            'full_name': company_name,
            'email': f"contact@{company_name.lower().replace(' ', '')}.example.com",
            'bio': "Investment firm",
            'user_type': 'investor',
            'avatar_url': f"https://randomuser.me/api/portraits/men/{random_index}.jpg",
            'investment_thesis': "Investing in innovative companies",
            'investment_stages': ["Seed", "Series A"],
            'preferred_industries': ["Technology"],
            'investment_sizes': {
                'min': 100000,
                'max': 1000000,
                'currency': 'EUR'
            }
        }

# Function to generate SQL INSERT statements for profiles
def generate_profiles_sql(vc_data):
    sql_statements = []
    
    for vc in vc_data:
        sql = f"""
INSERT INTO public.profiles (id, email, full_name, user_type, company_name, bio, website_url, avatar_url)
VALUES (
    '{vc['id']}',
    '{vc['email']}',
    '{vc['full_name'].replace("'", "''")}',
    'investor',
    '{vc['company_name'].replace("'", "''")}',
    '{vc.get('bio', 'Investment firm').replace("'", "''")}',
    '{vc.get('website_url', '')}',
    '{vc.get('avatar_url', '')}'
)
ON CONFLICT (id) DO NOTHING;
"""
        sql_statements.append(sql)
    
    return sql_statements

# Function to generate SQL INSERT statements for investor_profiles
def generate_investor_profiles_sql(vc_data):
    sql_statements = []
    
    for vc in vc_data:
        if vc.get('investment_thesis'):
            # Prepare JSON for investment_sizes
            investment_sizes_json = json.dumps(vc.get('investment_sizes', {'min': 100000, 'max': 1000000, 'currency': 'EUR'}))
            
            # Prepare arrays for investment_stages and preferred_industries
            investment_stages_arr = '{' + ','.join(f'"{stage}"' for stage in vc.get('investment_stages', ['Seed'])) + '}'
            preferred_industries_arr = '{' + ','.join(f'"{industry}"' for industry in vc.get('preferred_industries', ['Technology'])) + '}'
            
            sql = f"""
INSERT INTO public.investor_profiles (profile_id, investment_thesis, investment_stages, preferred_industries, investment_sizes)
VALUES (
    '{vc['id']}',
    '{vc['investment_thesis'].replace("'", "''")}',
    '{investment_stages_arr}',
    '{preferred_industries_arr}',
    '{investment_sizes_json}'::jsonb
)
ON CONFLICT (profile_id) DO UPDATE SET
    investment_thesis = EXCLUDED.investment_thesis,
    investment_stages = EXCLUDED.investment_stages,
    preferred_industries = EXCLUDED.preferred_industries,
    investment_sizes = EXCLUDED.investment_sizes;
"""
            sql_statements.append(sql)
    
    return sql_statements

# Function to generate SQL UPDATE statement for Antler's portfolio
def generate_portfolio_sql(antler_id, portfolio_companies):
    # Convert portfolio to JSON array
    portfolio_json = json.dumps(portfolio_companies)
    
    sql = f"""
UPDATE public.investor_profiles
SET portfolio = '{portfolio_json}'::jsonb[]
WHERE profile_id = '{antler_id}';
"""
    
    return [sql]

# Function to generate SQL INSERT statements for funding_opportunities
def generate_funding_opportunities_sql(vc_data):
    sql_statements = []
    
    for vc in vc_data:
        # Create a simple funding opportunity based on the VC
        opportunity_id = generate_uuid()
        
        # Get min/max from investment_sizes
        investment_sizes = vc.get('investment_sizes', {'min': 100000, 'max': 1000000})
        min_amount = investment_sizes.get('min', 100000)
        max_amount = investment_sizes.get('max', 1000000)
        
        # Get sectors from preferred_industries
        sectors = vc.get('preferred_industries', ['Technology'])
        sector_str = ', '.join(sectors[:3])  # Take the first 3 industries
        
        # Generate description
        company_name = vc.get('company_name', 'Investment Firm')
        description = f"{company_name} invests in {sector_str} companies at {', '.join(vc.get('investment_stages', ['Seed']))} stages."
        
        # Get website URL for relevant_links
        website_url = vc.get('website_url', '')
        relevant_links = '{' + (f'"{website_url}"' if website_url else '') + '}'
        
        sql = f"""
INSERT INTO public.funding_opportunities (
    id, title, fund_provider, sector, amount_description, amount_min, amount_max,
    location, description, relevant_links, display_type, funding_type, created_at
)
VALUES (
    '{opportunity_id}',
    '{company_name} {vc.get('investment_stages', ['Seed'])[0]} Fund',
    '{company_name.replace("'", "''")}',
    '{sector_str.replace("'", "''")}',
    '{min_amount:,} - {max_amount:,} {investment_sizes.get('currency', 'EUR')}',
    {min_amount},
    {max_amount},
    'Netherlands',
    '{description.replace("'", "''")}',
    '{relevant_links}',
    'default',
    '{vc.get('investment_stages', ['Seed'])[0]}',
    NOW()
)
ON CONFLICT DO NOTHING;

-- Link opportunity to investor profile
INSERT INTO public.investor_opportunity_links (id, investor_id, opportunity_id, relationship_type)
VALUES (
    '{generate_uuid()}',
    '{vc['id']}',
    '{opportunity_id}',
    'provider'
)
ON CONFLICT DO NOTHING;
"""
        sql_statements.append(sql)
    
    return sql_statements

def main():
    # Parse data files
    vcs_from_websites = parse_website_links(WEBSITE_LINKS_CSV)
    antler_portfolio = parse_antler_portfolio(ANTLER_PORTFOLIO_CSV)
    
    # Try to parse MD files if they exist
    vc_nl_data = []
    try:
        vc_nl_data = [parse_markdown_file(VC_NL_MD)]
    except:
        print(f"Warning: Could not parse {VC_NL_MD}")
    
    antler_data = []
    try:
        antler_data = [parse_markdown_file(ANTLER_MD)]
    except:
        print(f"Warning: Could not parse {ANTLER_MD}")
        # Create a basic Antler entry if parse fails
        antler_data = [{
            'id': generate_uuid(),
            'company_name': 'Antler',
            'full_name': 'Antler Global',
            'email': 'contact@antler.co',
            'bio': 'Antler is a global early-stage VC enabling exceptional entrepreneurs.',
            'website_url': 'https://www.antler.co',
            'user_type': 'investor',
            'avatar_url': 'https://randomuser.me/api/portraits/men/42.jpg',
            'investment_thesis': 'Invests in exceptional founders from day zero across sectors globally.',
            'investment_stages': ['Pre-seed', 'Seed'],
            'preferred_industries': ['Technology', 'SaaS', 'FinTech', 'HealthTech'],
            'investment_sizes': {
                'min': 100000,
                'max': 500000,
                'currency': 'EUR'
            }
        }]
    
    # Combine all VC data
    all_vc_data = vcs_from_websites + vc_nl_data + antler_data
    
    # Generate SQL statements
    sql_statements = []
    sql_statements.append("-- Generated SQL for importing fund data\n")
    
    # Generate profiles SQL
    sql_statements.append("\n-- Insert VC profiles\n")
    sql_statements.extend(generate_profiles_sql(all_vc_data))
    
    # Generate investor_profiles SQL
    sql_statements.append("\n-- Insert investor profiles\n")
    sql_statements.extend(generate_investor_profiles_sql(all_vc_data))
    
    # Generate Antler portfolio SQL if Antler exists
    if antler_data:
        sql_statements.append("\n-- Update Antler portfolio\n")
        sql_statements.extend(generate_portfolio_sql(antler_data[0]['id'], antler_portfolio))
    
    # Generate funding_opportunities SQL
    sql_statements.append("\n-- Insert funding opportunities\n")
    sql_statements.extend(generate_funding_opportunities_sql(all_vc_data))
    
    # Write SQL to file
    with open(OUTPUT_SQL, 'w') as f:
        for statement in sql_statements:
            f.write(statement + "\n")
    
    print(f"SQL generation complete! Check {OUTPUT_SQL} for the generated SQL statements.")
    print(f"Generated SQL for {len(all_vc_data)} VC firms and {len(antler_portfolio)} portfolio companies.")

if __name__ == "__main__":
    main()

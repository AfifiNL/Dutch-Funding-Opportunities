# Database Documentation

This document outlines the database architecture, schema, and key operations for the Dutch Funding Opportunities application.

## Overview

The application uses Supabase (PostgreSQL) as its database provider. The database stores information about startups, funding opportunities, investors, user profiles, and user progress.

## Database Schema

### Core Tables

#### Profiles
Stores user profile information linked to Supabase Auth.

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  user_type TEXT DEFAULT 'founder' CHECK (user_type IN ('founder', 'investor', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" 
ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON profiles FOR UPDATE USING (auth.uid() = id);

-- Create trigger for updated_at
CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();
```

#### Startups
Stores information about startups created by founders.

```sql
CREATE TABLE startups (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  founder_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  sector TEXT,
  industry TEXT,
  stage TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE startups ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Startup owners can manage their startups" 
ON startups FOR ALL USING (auth.uid() = founder_id);

CREATE POLICY "All authenticated users can view startups" 
ON startups FOR SELECT TO authenticated USING (true);

-- Create trigger for updated_at
CREATE TRIGGER set_startups_updated_at
BEFORE UPDATE ON startups
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();
```

#### Funding Opportunities
Stores funding opportunities available to startups.

```sql
CREATE TABLE funding_opportunities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  min_funding_amount NUMERIC,
  max_funding_amount NUMERIC,
  provider TEXT,
  provider_type TEXT,
  provider_url TEXT,
  deadline DATE,
  eligibility_criteria JSONB,
  application_process TEXT,
  sector TEXT[],
  stage TEXT[],
  geographic_focus TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE funding_opportunities ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "All authenticated users can view opportunities" 
ON funding_opportunities FOR SELECT TO authenticated USING (true);

CREATE POLICY "Only admins can modify opportunities" 
ON funding_opportunities FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.user_type = 'admin'
  )
);

-- Create trigger for updated_at
CREATE TRIGGER set_funding_opportunities_updated_at
BEFORE UPDATE ON funding_opportunities
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();
```

#### Investors
Stores information about investors who provide funding.

```sql
CREATE TABLE investors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  investor_type TEXT,
  focus_sectors TEXT[],
  focus_stages TEXT[],
  min_investment_size NUMERIC,
  max_investment_size NUMERIC,
  website_url TEXT,
  contact_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE investors ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "All authenticated users can view investors" 
ON investors FOR SELECT TO authenticated USING (true);

CREATE POLICY "Only admins can modify investors" 
ON investors FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.user_type = 'admin'
  )
);

-- Create trigger for updated_at
CREATE TRIGGER set_investors_updated_at
BEFORE UPDATE ON investors
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();
```

#### User Progress
Tracks user progress through the application.

```sql
CREATE TABLE user_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  completed_stages JSONB DEFAULT '{}'::JSONB,
  pitch_steps_completed JSONB DEFAULT '{}'::JSONB,
  total_achievements INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own progress" 
ON user_progress FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
ON user_progress FOR UPDATE USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER set_user_progress_updated_at
BEFORE UPDATE ON user_progress
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();
```

#### Achievements
Stores achievements that users can unlock.

```sql
CREATE TABLE achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT,
  points INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "All authenticated users can view achievements" 
ON achievements FOR SELECT TO authenticated USING (true);

CREATE POLICY "Only admins can modify achievements" 
ON achievements FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.user_type = 'admin'
  )
);
```

#### User Achievements
Junction table to track which achievements users have unlocked.

```sql
CREATE TABLE user_achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  achievement_id UUID REFERENCES achievements NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Enable RLS
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own achievements" 
ON user_achievements FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert achievements" 
ON user_achievements FOR INSERT WITH CHECK (true);
```

### Relationship Diagram

```
┌────────────┐         ┌─────────────┐         ┌────────────────────┐
│  auth.users ├─────────┤   profiles  │         │ funding_opportunities│
└─────┬──────┘         └─────────────┘         └────────────────────┘
      │                                                   ▲
      │                                                   │
      │                                                   │
      │                 ┌─────────────┐         ┌─────────┴──────┐
      ├─────────────────┤   startups  ├─────────┤   investments  │
      │                 └─────────────┘         └────────────────┘
      │                                                   ▲
      │                 ┌─────────────┐                   │
      ├─────────────────┤user_progress│                   │
      │                 └─────────────┘                   │
      │                                                   │
      │                 ┌─────────────┐         ┌─────────┴──────┐
      └─────────────────┤user_achievements├─────┤  achievements  │
                        └─────────────┘         └────────────────┘
                                                        ▲
                                                        │
                                                ┌───────┴──────┐
                                                │   investors  │
                                                └──────────────┘
```

## Utility Functions

### Timestamp Trigger

Automatically updates the `updated_at` field when a row is updated.

```sql
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Handle New User

Creates a profile and user progress record when a new user signs up.

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  
  INSERT INTO public.user_progress (user_id)
  VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## Supabase Integration

### Client Configuration

The application uses the Supabase client to interact with the database:

```typescript
// src/api/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
```

### Typed Database Schema

For type safety, the application uses TypeScript definitions generated from the database schema:

```typescript
// src/types/supabase.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          user_type: string
          created_at: string
          updated_at: string
        }
        // ... other table definitions
      }
      // ... other tables
    }
  }
}
```

### Data Access Layer

The application uses a data access layer to interact with the database:

```typescript
// Example: src/api/supabase/investors.ts
import { supabase } from './client';
import { Investor } from '@/types';

export async function fetchInvestors(): Promise<Investor[]> {
  const { data, error } = await supabase
    .from('investors')
    .select('*');
    
  if (error) {
    console.error('Error fetching investors:', error);
    throw error;
  }
  
  return data as Investor[];
}
```

## Data Migration

### Seeding Data

The application uses database migrations to seed initial data:

```sql
-- Example seed data for achievements
INSERT INTO achievements (name, description, icon_url, points)
VALUES
  ('First Login', 'Logged into the application for the first time', '/icons/first-login.svg', 5),
  ('Profile Completed', 'Completed your user profile', '/icons/profile.svg', 10),
  ('Pitch Started', 'Started creating your first pitch', '/icons/pitch.svg', 15);
```

### Migration Management

Migrations are managed using the Supabase migration tools:

```bash
# Create a new migration
supabase migration new create_achievements_table

# Apply migrations
supabase db push
```

## Query Patterns

### Basic CRUD Operations

```typescript
// Create
const { data, error } = await supabase
  .from('startups')
  .insert([
    { name: 'My Startup', founder_id: user.id, description: 'Description' }
  ])
  .select();

// Read
const { data, error } = await supabase
  .from('startups')
  .select('*')
  .eq('founder_id', user.id);

// Update
const { data, error } = await supabase
  .from('startups')
  .update({ name: 'Updated Name' })
  .eq('id', startupId)
  .select();

// Delete
const { error } = await supabase
  .from('startups')
  .delete()
  .eq('id', startupId);
```

### Advanced Queries

#### Joins

```typescript
// Get startup with related funding opportunities
const { data, error } = await supabase
  .from('startups')
  .select(`
    *,
    investments(
      funding_opportunity_id,
      funding_opportunities(*)
    )
  `)
  .eq('id', startupId);
```

#### Filtering

```typescript
// Get funding opportunities matching startup criteria
const { data, error } = await supabase
  .from('funding_opportunities')
  .select('*')
  .contains('sector', [startup.sector])
  .contains('stage', [startup.stage])
  .gte('max_funding_amount', minAmount)
  .lte('min_funding_amount', maxAmount);
```

#### Pagination

```typescript
// Get paginated results
const { data, error, count } = await supabase
  .from('funding_opportunities')
  .select('*', { count: 'exact' })
  .range(page * pageSize, (page + 1) * pageSize - 1);
```

### Transaction Patterns

For operations that require multiple steps, use Supabase's PostgreSQL functions:

```sql
CREATE OR REPLACE FUNCTION apply_to_opportunity(
  startup_id UUID,
  opportunity_id UUID,
  user_id UUID
)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check if user owns startup
  IF NOT EXISTS (
    SELECT 1 FROM startups 
    WHERE id = startup_id AND founder_id = user_id
  ) THEN
    RETURN jsonb_build_object('success', false, 'message', 'Not authorized');
  END IF;
  
  -- Create application
  INSERT INTO opportunity_applications (
    startup_id, 
    opportunity_id, 
    status
  ) VALUES (
    startup_id, 
    opportunity_id, 
    'pending'
  )
  RETURNING * INTO result;
  
  -- Update user progress
  UPDATE user_progress
  SET 
    total_applications = total_applications + 1,
    updated_at = NOW()
  WHERE user_id = user_id;
  
  RETURN jsonb_build_object('success', true, 'data', result);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Performance Considerations

### Indexes

Key indexes to optimize query performance:

```sql
-- Index on funding opportunities for filtering
CREATE INDEX idx_funding_opportunities_sector_stage ON funding_opportunities USING GIN (sector, stage);

-- Index on startups for founder lookup
CREATE INDEX idx_startups_founder_id ON startups (founder_id);

-- Index on user_achievements for quick user achievement lookup
CREATE INDEX idx_user_achievements_user_id ON user_achievements (user_id);
```

### Query Optimization

- Use `select()` to specify only needed columns
- Use appropriate indexes for frequently queried fields
- Use prepared statements to avoid SQL injection
- Use pagination for large result sets
- Use caching for frequently accessed, rarely changing data

## Database Security

### Row Level Security (RLS)

The application uses Row Level Security to restrict access to data:

```sql
-- Example: Only allow users to see their own startups
CREATE POLICY "Users can see their own startups"
ON startups
FOR SELECT
USING (auth.uid() = founder_id);
```

### Database Roles

The application uses two main database roles:

1. **anon**: Limited access for unauthenticated users
2. **authenticated**: Access for authenticated users based on RLS policies

### Sensitive Data Handling

- Personally identifiable information (PII) is accessed only through secure APIs
- Financial data is encrypted at rest
- API keys and secrets are stored in environment variables, not in the database

## Backup and Recovery

Supabase automatically manages database backups. For additional protection:

1. Regular database exports using Supabase CLI
2. Point-in-time recovery through Supabase dashboard
3. Application-level data export functionality for key entities

## Monitoring and Logging

- Monitor database performance using Supabase dashboard
- Log all critical database operations
- Set up alerts for database errors or performance issues

## Local Development

For local development, use:

```bash
# Start local Supabase
supabase start

# Seed local database
supabase db reset

# Generate TypeScript types
supabase gen types typescript --local > src/types/supabase.ts
```

## Data Migration Tools

When migrating from Airtable to Supabase, the application used custom scripts:

```typescript
// Example migration script
import { supabase } from './supabaseClient';
import { airtable } from './airtableClient';

async function migrateFundingOpportunities() {
  // Fetch from Airtable
  const airtableRecords = await airtable('Funding Opportunities').select().all();
  
  // Transform to Supabase format
  const supabaseRecords = airtableRecords.map(record => ({
    name: record.get('Name'),
    description: record.get('Description'),
    // ... other fields
  }));
  
  // Insert into Supabase
  const { data, error } = await supabase
    .from('funding_opportunities')
    .insert(supabaseRecords);
    
  if (error) {
    console.error('Migration error:', error);
    throw error;
  }
  
  console.log(`Migrated ${data.length} funding opportunities`);
}
```

## Testing Database Access

Example testing the database layer with Jest:

```typescript
// Example test for investor data access
describe('Investor Data Access', () => {
  it('should fetch investors', async () => {
    // Mock Supabase response
    jest.spyOn(supabase, 'from').mockImplementation(() => ({
      select: jest.fn().mockReturnValue({
        data: [{ id: '1', name: 'Test Investor' }],
        error: null
      })
    }));
    
    const result = await fetchInvestors();
    
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Test Investor');
  });
});
``` 
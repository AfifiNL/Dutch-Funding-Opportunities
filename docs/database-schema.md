# Database Schema

This document outlines the database schema used in the Dutch Funding Opportunities application. The project uses Supabase with PostgreSQL as the database backend.

## Overview

The database is structured to support:
- User authentication and profiles
- Startup information
- Investor data
- Funding opportunities
- Pitch tracking
- User progress and achievements

## Tables

### `auth.users` (Managed by Supabase Auth)

This table is automatically managed by Supabase Auth and stores user authentication information.

| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` | Primary key |
| `email` | `text` | User's email address |
| `encrypted_password` | `text` | Encrypted password |
| `confirmed_at` | `timestamp` | Email confirmation timestamp |
| `last_sign_in_at` | `timestamp` | Last login timestamp |
| ... | ... | Additional auth fields |

### `public.profiles`

Stores user profile information.

```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  profile_picture TEXT,
  user_type TEXT DEFAULT 'founder',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Define access policies
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Create trigger for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### `public.user_progress`

Tracks user progress through the application.

```sql
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  completed_stages JSONB DEFAULT '{}',
  current_stage TEXT,
  pitch_steps_completed JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE (user_id)
);

-- Enable Row Level Security
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Define access policies
CREATE POLICY "Users can view their own progress" 
  ON public.user_progress FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
  ON public.user_progress FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" 
  ON public.user_progress FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### `public.startups`

Stores information about startups.

```sql
CREATE TABLE public.startups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  founder_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  sector TEXT,
  industry TEXT,
  stage TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE public.startups ENABLE ROW LEVEL SECURITY;

-- Define access policies
CREATE POLICY "Founders can view their own startups" 
  ON public.startups FOR SELECT 
  USING (auth.uid() = founder_id);

CREATE POLICY "Founders can update their own startups" 
  ON public.startups FOR UPDATE 
  USING (auth.uid() = founder_id);

CREATE POLICY "Founders can insert their own startups" 
  ON public.startups FOR INSERT 
  WITH CHECK (auth.uid() = founder_id);

CREATE POLICY "Investors can view all startups" 
  ON public.startups FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.user_type = 'investor'
  ));

-- Create trigger for updated_at
CREATE TRIGGER update_startups_updated_at
  BEFORE UPDATE ON public.startups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### `public.pitches`

Stores pitch information.

```sql
CREATE TABLE public.pitches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  startup_id UUID REFERENCES public.startups(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  elevator_pitch TEXT,
  problem_statement TEXT,
  solution_description TEXT,
  target_market TEXT,
  business_model TEXT,
  competitors TEXT,
  competitive_advantage TEXT,
  team_description TEXT,
  traction TEXT,
  funding_ask NUMERIC,
  funding_use TEXT,
  financials JSONB DEFAULT '{}',
  stage TEXT,
  status TEXT DEFAULT 'draft',
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE public.pitches ENABLE ROW LEVEL SECURITY;

-- Define access policies
CREATE POLICY "Users can view their own pitches" 
  ON public.pitches FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own pitches" 
  ON public.pitches FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own pitches" 
  ON public.pitches FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Investors can view submitted pitches" 
  ON public.pitches FOR SELECT 
  USING (
    (EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.user_type = 'investor'
    ))
    AND
    status = 'submitted'
  );

-- Create trigger for updated_at
CREATE TRIGGER update_pitches_updated_at
  BEFORE UPDATE ON public.pitches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### `public.investors`

Stores investor information.

```sql
CREATE TABLE public.investors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  website TEXT,
  investor_type TEXT,
  focus_sectors TEXT[],
  focus_stages TEXT[],
  investment_range_min NUMERIC,
  investment_range_max NUMERIC,
  location TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE public.investors ENABLE ROW LEVEL SECURITY;

-- Define access policies
CREATE POLICY "All users can view investors" 
  ON public.investors FOR SELECT 
  USING (true);

CREATE POLICY "Admins can update investors" 
  ON public.investors FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.user_type = 'admin'
  ));

CREATE POLICY "Admins can insert investors" 
  ON public.investors FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.user_type = 'admin'
  ));

-- Create trigger for updated_at
CREATE TRIGGER update_investors_updated_at
  BEFORE UPDATE ON public.investors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### `public.funding_opportunities`

Stores funding opportunities information.

```sql
CREATE TABLE public.funding_opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  provider TEXT,
  provider_logo TEXT,
  opportunity_type TEXT,
  funding_amount_min NUMERIC,
  funding_amount_max NUMERIC,
  eligibility_criteria TEXT[],
  application_process TEXT,
  application_deadline TIMESTAMP WITH TIME ZONE,
  application_link TEXT,
  focus_sectors TEXT[],
  focus_stages TEXT[],
  success_rate TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE public.funding_opportunities ENABLE ROW LEVEL SECURITY;

-- Define access policies
CREATE POLICY "All users can view funding opportunities" 
  ON public.funding_opportunities FOR SELECT 
  USING (true);

CREATE POLICY "Admins can update funding opportunities" 
  ON public.funding_opportunities FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.user_type = 'admin'
  ));

CREATE POLICY "Admins can insert funding opportunities" 
  ON public.funding_opportunities FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.user_type = 'admin'
  ));

-- Create trigger for updated_at
CREATE TRIGGER update_funding_opportunities_updated_at
  BEFORE UPDATE ON public.funding_opportunities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### `public.investor_funding_opportunities`

Junction table to connect investors with funding opportunities they offer.

```sql
CREATE TABLE public.investor_funding_opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  investor_id UUID REFERENCES public.investors(id) ON DELETE CASCADE,
  opportunity_id UUID REFERENCES public.funding_opportunities(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE (investor_id, opportunity_id)
);

-- Enable Row Level Security
ALTER TABLE public.investor_funding_opportunities ENABLE ROW LEVEL SECURITY;

-- Define access policies
CREATE POLICY "All users can view investor funding opportunities" 
  ON public.investor_funding_opportunities FOR SELECT 
  USING (true);

CREATE POLICY "Admins can update investor funding opportunities" 
  ON public.investor_funding_opportunities FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.user_type = 'admin'
  ));

CREATE POLICY "Admins can insert investor funding opportunities" 
  ON public.investor_funding_opportunities FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.user_type = 'admin'
  ));
```

### `public.achievements`

Stores achievement definitions.

```sql
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  criteria TEXT,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Define access policies
CREATE POLICY "All users can view achievements" 
  ON public.achievements FOR SELECT 
  USING (true);

CREATE POLICY "Admins can update achievements" 
  ON public.achievements FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.user_type = 'admin'
  ));

CREATE POLICY "Admins can insert achievements" 
  ON public.achievements FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.user_type = 'admin'
  ));

-- Create trigger for updated_at
CREATE TRIGGER update_achievements_updated_at
  BEFORE UPDATE ON public.achievements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### `public.user_achievements`

Junction table to track which achievements users have unlocked.

```sql
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE (user_id, achievement_id)
);

-- Enable Row Level Security
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Define access policies
CREATE POLICY "Users can view their own achievements" 
  ON public.user_achievements FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert user achievements" 
  ON public.user_achievements FOR INSERT 
  WITH CHECK (true); -- This is handled by application logic
```

## Helper Functions

### `update_updated_at_column()`

This function is used by triggers to automatically update the `updated_at` column.

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### `create_user_profile_on_signup()`

This function is used by a trigger to automatically create a user profile when a new user signs up.

```sql
CREATE OR REPLACE FUNCTION create_user_profile_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on auth.users
CREATE TRIGGER on_user_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_user_profile_on_signup();
```

## Indexes

Indexes are created to optimize common query patterns:

```sql
-- Indexes for user_progress
CREATE INDEX idx_user_progress_user_id ON public.user_progress(user_id);

-- Indexes for startups
CREATE INDEX idx_startups_founder_id ON public.startups(founder_id);
CREATE INDEX idx_startups_stage ON public.startups(stage);
CREATE INDEX idx_startups_industry ON public.startups(industry);

-- Indexes for pitches
CREATE INDEX idx_pitches_user_id ON public.pitches(user_id);
CREATE INDEX idx_pitches_startup_id ON public.pitches(startup_id);
CREATE INDEX idx_pitches_status ON public.pitches(status);
CREATE INDEX idx_pitches_stage ON public.pitches(stage);

-- Indexes for funding_opportunities
CREATE INDEX idx_funding_opportunities_type ON public.funding_opportunities(opportunity_type);
CREATE INDEX idx_funding_opportunities_provider ON public.funding_opportunities(provider);

-- Indexes for investors
CREATE INDEX idx_investors_type ON public.investors(investor_type);
CREATE INDEX idx_investors_location ON public.investors(location);

-- Indexes for junction tables
CREATE INDEX idx_investor_funding_opportunities_investor_id 
  ON public.investor_funding_opportunities(investor_id);
CREATE INDEX idx_investor_funding_opportunities_opportunity_id 
  ON public.investor_funding_opportunities(opportunity_id);
CREATE INDEX idx_user_achievements_user_id 
  ON public.user_achievements(user_id);
```

## Row Level Security (RLS) Policies

Supabase uses PostgreSQL's Row Level Security to ensure data access is properly controlled:

1. **Authentication-based access**: Only users who are authenticated can access their own data
2. **Role-based access**: Different user types (founder, investor, admin) have different access levels
3. **Public data access**: Some data (like funding opportunities) is accessible to all authenticated users

## Schema Evolution

As the application evolves, schema migrations are managed through:

1. **Migration files**: Stored in version control
2. **Supabase Migration Tools**: Used to apply migrations safely
3. **Compatibility layers**: To handle schema changes without breaking existing code

## Example Queries

### Get a user's profile with progress

```sql
SELECT 
  p.*,
  up.completed_stages,
  up.current_stage,
  up.pitch_steps_completed
FROM
  profiles p
LEFT JOIN user_progress up ON p.id = up.user_id
WHERE
  p.id = auth.uid();
```

### Get all funding opportunities matching a startup's stage and sector

```sql
SELECT 
  fo.*
FROM
  funding_opportunities fo,
  startups s
WHERE
  s.founder_id = auth.uid()
  AND s.id = '00000000-0000-0000-0000-000000000000'
  AND (
    fo.focus_stages @> ARRAY[s.stage]
    OR fo.focus_stages IS NULL
    OR array_length(fo.focus_stages, 1) IS NULL
  )
  AND (
    fo.focus_sectors @> ARRAY[s.sector]
    OR fo.focus_sectors IS NULL
    OR array_length(fo.focus_sectors, 1) IS NULL
  );
```

### Get all achievements unlocked by a user

```sql
SELECT 
  a.*,
  ua.unlocked_at
FROM
  achievements a
JOIN user_achievements ua ON a.id = ua.achievement_id
WHERE
  ua.user_id = auth.uid();
```

### Get investors matching a startup's stage and sector

```sql
SELECT 
  i.*
FROM
  investors i,
  startups s
WHERE
  s.founder_id = auth.uid()
  AND s.id = '00000000-0000-0000-0000-000000000000'
  AND (
    i.focus_stages @> ARRAY[s.stage]
    OR i.focus_stages IS NULL
    OR array_length(i.focus_stages, 1) IS NULL
  )
  AND (
    i.focus_sectors @> ARRAY[s.sector]
    OR i.focus_sectors IS NULL
    OR array_length(i.focus_sectors, 1) IS NULL
  );
``` 
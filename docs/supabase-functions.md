# Supabase Functions & Serverless Features

This document outlines the serverless functions, triggers, and edge functions implemented within the Dutch Funding Opportunities application using Supabase.

## Table of Contents

- [Overview](#overview)
- [Database Functions](#database-functions)
- [Database Triggers](#database-triggers)
- [Edge Functions](#edge-functions)
- [Scheduled Jobs](#scheduled-jobs)
- [Implementation Guidelines](#implementation-guidelines)
- [Testing & Debugging](#testing--debugging)

## Overview

Supabase provides several serverless features that allow us to extend the database functionality:

1. **Database Functions**: PostgreSQL functions that run inside the database
2. **Database Triggers**: Automatic responses to database events
3. **Edge Functions**: Serverless functions deployed at the edge
4. **Scheduled Jobs**: Jobs that run on a fixed schedule

These features allow us to implement complex business logic, maintain data integrity, and perform tasks asynchronously without relying on a dedicated backend server.

## Database Functions

PostgreSQL functions in Supabase help implement server-side logic directly in the database. The following SQL functions have been implemented:

### `unlock_achievement(p_user_id UUID, p_achievement_id UUID) RETURNS BOOLEAN`

Unlocks an achievement for a user and updates their XP points.

```sql
CREATE OR REPLACE FUNCTION public.unlock_achievement(
  p_user_id UUID,
  p_achievement_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_achievement_exists BOOLEAN;
  v_already_unlocked BOOLEAN;
  v_xp_points INTEGER;
BEGIN
  -- Check if achievement exists and is active
  SELECT EXISTS (
    SELECT 1 FROM public.achievements 
    WHERE id = p_achievement_id AND is_active = TRUE
  ) INTO v_achievement_exists;
  
  IF NOT v_achievement_exists THEN
    RAISE EXCEPTION 'Achievement does not exist or is not active';
    RETURN FALSE;
  END IF;
  
  -- Check if user already has this achievement
  SELECT EXISTS (
    SELECT 1 FROM public.user_achievements 
    WHERE user_id = p_user_id AND achievement_id = p_achievement_id
  ) INTO v_already_unlocked;
  
  IF v_already_unlocked THEN
    -- Already unlocked, nothing to do
    RETURN TRUE;
  END IF;
  
  -- Get XP points for this achievement
  SELECT xp_points FROM public.achievements
  WHERE id = p_achievement_id
  INTO v_xp_points;
  
  -- Insert the user_achievement record
  INSERT INTO public.user_achievements (
    user_id,
    achievement_id,
    date_unlocked,
    created_at
  ) VALUES (
    p_user_id,
    p_achievement_id,
    NOW(),
    NOW()
  );
  
  -- Update user progress by adding XP points
  BEGIN
    -- Check if user_progress exists for this user
    IF EXISTS (SELECT 1 FROM public.user_progress WHERE user_id = p_user_id) THEN
      -- Update existing progress
      UPDATE public.user_progress
      SET profile_completion = COALESCE(profile_completion, 0) + v_xp_points,
          last_active = NOW()
      WHERE user_id = p_user_id;
    ELSE
      -- Create new progress entry
      INSERT INTO public.user_progress (
        user_id,
        profile_completion,
        last_active,
        created_at,
        updated_at
      ) VALUES (
        p_user_id,
        v_xp_points,
        NOW(),
        NOW(),
        NOW()
      );
    END IF;
  EXCEPTION WHEN OTHERS THEN
    -- If user_progress table doesn't exist yet, just continue
    RAISE NOTICE 'Could not update user_progress: %', SQLERRM;
  END;
  
  -- Success
  RETURN TRUE;
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Error unlocking achievement: %', SQLERRM;
  RETURN FALSE;
END;
$$;
```

### `get_user_achievements(p_user_id UUID)`

Retrieves all achievements for a user, indicating which ones they've unlocked.

```sql
CREATE OR REPLACE FUNCTION public.get_user_achievements(
  p_user_id UUID
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  xp_points INTEGER,
  category TEXT,
  icon TEXT,
  is_unlocked BOOLEAN,
  date_unlocked TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.title,
    a.description,
    a.xp_points,
    a.category,
    a.icon,
    CASE WHEN ua.id IS NOT NULL THEN TRUE ELSE FALSE END as is_unlocked,
    ua.date_unlocked
  FROM 
    public.achievements a
  LEFT JOIN 
    public.user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = p_user_id
  WHERE 
    a.is_active = TRUE
  ORDER BY
    a.category,
    a.xp_points;
END;
$$;
```

### `get_user_achievement_summary(p_user_id UUID)`

Provides a summary of a user's achievement progress.

```sql
CREATE OR REPLACE FUNCTION public.get_user_achievement_summary(
  p_user_id UUID
)
RETURNS TABLE (
  total_achievements BIGINT,
  unlocked_achievements BIGINT,
  completion_percentage NUMERIC,
  total_xp BIGINT,
  achievements_by_category JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH 
    achievement_counts AS (
      SELECT
        COUNT(*) AS total,
        COUNT(ua.id) AS unlocked,
        COALESCE(SUM(CASE WHEN ua.id IS NOT NULL THEN a.xp_points ELSE 0 END), 0) AS xp_total
      FROM 
        public.achievements a
      LEFT JOIN 
        public.user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = p_user_id
      WHERE 
        a.is_active = TRUE
    ),
    by_category AS (
      SELECT
        a.category,
        COUNT(*) AS total,
        COUNT(ua.id) AS unlocked
      FROM 
        public.achievements a
      LEFT JOIN 
        public.user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = p_user_id
      WHERE 
        a.is_active = TRUE
      GROUP BY
        a.category
    )
  SELECT
    ac.total AS total_achievements,
    ac.unlocked AS unlocked_achievements,
    CASE 
      WHEN ac.total = 0 THEN 0
      ELSE ROUND((ac.unlocked::NUMERIC / ac.total) * 100, 1)
    END AS completion_percentage,
    ac.xp_total AS total_xp,
    (
      SELECT jsonb_object_agg(category, jsonb_build_object(
        'total', total, 
        'unlocked', unlocked, 
        'percentage', CASE WHEN total = 0 THEN 0 ELSE ROUND((unlocked::NUMERIC / total) * 100, 1) END
      ))
      FROM by_category
    ) AS achievements_by_category
  FROM
    achievement_counts ac;
END;
$$;
```

### `has_achievement(p_user_id UUID, p_achievement_id UUID) RETURNS BOOLEAN`

Checks if a user has unlocked a specific achievement.

```sql
CREATE OR REPLACE FUNCTION public.has_achievement(
  p_user_id UUID,
  p_achievement_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_has_achievement BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM public.user_achievements 
    WHERE 
      user_id = p_user_id AND 
      achievement_id = p_achievement_id
  ) INTO v_has_achievement;
  
  RETURN v_has_achievement;
END;
$$;
```

### `check_achievements_progress(p_user_id UUID)`

Checks a user's progress toward unlocking achievements.

```sql
CREATE OR REPLACE FUNCTION public.check_achievements_progress(
  p_user_id UUID
)
RETURNS TABLE (
  achievement_id UUID,
  title TEXT,
  description TEXT,
  category TEXT,
  xp_points INTEGER,
  progress BIGINT,
  progress_requirement INTEGER,
  is_qualified BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  
  WITH user_stats AS (
    -- Calculate various user statistics for achievement tracking
    SELECT 
      (SELECT COUNT(*) FROM public.pitches p 
       JOIN public.startups s ON p.startup_id = s.id
       WHERE s.founder_id = p_user_id) AS pitch_count,
      
      (SELECT COUNT(*) FROM public.connections 
       WHERE (requester_id = p_user_id OR recipient_id = p_user_id) 
       AND status = 'accepted') AS connection_count,
      
      -- Other statistics as needed for achievement progress
      -- ...
  ),
  
  achievements_meta AS (
    -- For each achievement, calculate progress and qualification status
    SELECT
      a.id, 
      a.title,
      a.description,
      a.category,
      a.xp_points,
      -- Calculate progress percentage for each achievement type
      CASE
        WHEN a.id = 'achievement-id-1' THEN 
          -- Achievement-specific progress calculation
          -- ...
        ELSE 0 
      END AS progress,
      -- Required value to complete the achievement
      CASE 
        WHEN a.id = 'achievement-id-1' THEN 5
        -- Other requirements
        ELSE 1
      END AS progress_requirement,
      -- Determine if qualified for the achievement
      CASE
        WHEN a.id = 'achievement-id-1' THEN 
          -- Achievement-specific qualification check
          -- ...
        ELSE FALSE
      END AS is_qualified
    FROM public.achievements a
    WHERE a.is_active = TRUE
  )
  
  -- Return achievements the user hasn't unlocked yet
  SELECT
    am.id,
    am.title,
    am.description,
    am.category,
    am.xp_points,
    am.progress,
    am.progress_requirement,
    am.is_qualified
  FROM 
    achievements_meta am
  LEFT JOIN
    public.user_achievements ua ON am.id = ua.achievement_id AND ua.user_id = p_user_id
  WHERE
    ua.id IS NULL  -- Only show achievements the user hasn't unlocked yet
  ORDER BY
    am.is_qualified DESC,
    am.progress DESC;
    
END;
$$;
```

### `get_pitch_completion(p_pitch_id UUID)`

Calculates completion percentage for a pitch.

```sql
CREATE OR REPLACE FUNCTION public.get_pitch_completion(
  p_pitch_id UUID
)
RETURNS TABLE (
  pitch_id UUID,
  title TEXT,
  startup_name TEXT,
  founder_id UUID,
  completed_sections INTEGER,
  total_sections INTEGER,
  completion_percentage NUMERIC
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id AS pitch_id,
    p.title,
    s.name AS startup_name,
    s.founder_id,
    -- Count filled sections
    (
      CASE WHEN p.problem_statement IS NOT NULL AND p.problem_statement != '' THEN 1 ELSE 0 END +
      CASE WHEN p.solution_description IS NOT NULL AND p.solution_description != '' THEN 1 ELSE 0 END +
      CASE WHEN p.business_model IS NOT NULL AND p.business_model != '' THEN 1 ELSE 0 END +
      CASE WHEN p.market_size IS NOT NULL AND p.market_size != '' THEN 1 ELSE 0 END +
      CASE WHEN p.competition IS NOT NULL AND p.competition != '' THEN 1 ELSE 0 END +
      CASE WHEN p.traction IS NOT NULL AND p.traction != '' THEN 1 ELSE 0 END +
      CASE WHEN p.team_description IS NOT NULL AND p.team_description != '' THEN 1 ELSE 0 END +
      CASE WHEN p.funding_ask IS NOT NULL AND p.funding_ask != '' THEN 1 ELSE 0 END +
      CASE WHEN p.use_of_funds IS NOT NULL AND p.use_of_funds != '' THEN 1 ELSE 0 END
    ) AS completed_sections,
    9 AS total_sections, -- Total number of pitch sections
    -- Calculate percentage
    (
      (
        CASE WHEN p.problem_statement IS NOT NULL AND p.problem_statement != '' THEN 1 ELSE 0 END +
        CASE WHEN p.solution_description IS NOT NULL AND p.solution_description != '' THEN 1 ELSE 0 END +
        CASE WHEN p.business_model IS NOT NULL AND p.business_model != '' THEN 1 ELSE 0 END +
        CASE WHEN p.market_size IS NOT NULL AND p.market_size != '' THEN 1 ELSE 0 END +
        CASE WHEN p.competition IS NOT NULL AND p.competition != '' THEN 1 ELSE 0 END +
        CASE WHEN p.traction IS NOT NULL AND p.traction != '' THEN 1 ELSE 0 END +
        CASE WHEN p.team_description IS NOT NULL AND p.team_description != '' THEN 1 ELSE 0 END +
        CASE WHEN p.funding_ask IS NOT NULL AND p.funding_ask != '' THEN 1 ELSE 0 END +
        CASE WHEN p.use_of_funds IS NOT NULL AND p.use_of_funds != '' THEN 1 ELSE 0 END
      )::NUMERIC / 9 * 100
    ) AS completion_percentage
  FROM
    pitches p
  JOIN
    startups s ON p.startup_id = s.id
  WHERE
    p.id = p_pitch_id;
END;
$$;
```

### `is_founder() RETURNS BOOLEAN` and `is_investor() RETURNS BOOLEAN`

Helper functions to check user roles.

```sql
CREATE OR REPLACE FUNCTION public.is_founder()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND user_type = 'founder'
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.is_investor()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND user_type = 'investor'
  );
END;
$$;
```

## Database Triggers

Triggers automatically respond to database events. Here are the implemented triggers:

### `trigger_set_timestamp()`

Updates the `updated_at` timestamp whenever a record is modified.

```sql
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Applied to tables with updated_at columns
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.trigger_set_timestamp();

-- Similar triggers for other tables with updated_at columns
```

### `handle_new_user()`

Creates a profile when a new user signs up.

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    avatar_url,
    user_type,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'founder'),
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$;

-- Trigger to execute the function on user creation
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();
```

### `check_achievements_after_action()`

Checks if a user has earned any achievements after certain actions.

```sql
CREATE OR REPLACE FUNCTION public.check_achievements_after_action()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_achievement_id UUID;
  v_achievement_check RECORD;
BEGIN
  -- Determine the user ID based on the table and action
  IF TG_TABLE_NAME = 'pitches' THEN
    -- For pitches, get the startup founder
    SELECT s.founder_id INTO v_user_id
    FROM public.startups s
    WHERE s.id = NEW.startup_id;
  ELSIF TG_TABLE_NAME = 'connections' THEN
    -- For connections, use the requester ID
    v_user_id := NEW.requester_id;
  ELSIF TG_TABLE_NAME = 'feedback' THEN
    -- For feedback, use the reviewer ID
    v_user_id := NEW.reviewer_id;
  ELSE
    -- Default to the user_id column if present
    v_user_id := NEW.user_id;
  END IF;

  -- If we couldn't determine a user ID, exit
  IF v_user_id IS NULL THEN
    RETURN NEW;
  END IF;

  -- Check for achievements that might be unlocked
  FOR v_achievement_check IN
    SELECT * FROM public.check_achievements_progress(v_user_id)
    WHERE is_qualified = TRUE
  LOOP
    -- Try to unlock the achievement
    PERFORM public.unlock_achievement(v_user_id, v_achievement_check.achievement_id);
  END LOOP;

  RETURN NEW;
END;
$$;

-- Apply the trigger to relevant tables
CREATE TRIGGER check_achievements_after_pitch_insert
AFTER INSERT ON public.pitches
FOR EACH ROW
EXECUTE FUNCTION public.check_achievements_after_action();

-- Similar triggers for other tables
```

## Edge Functions

Edge functions are serverless JavaScript/TypeScript functions deployed at the edge. The application uses the following edge functions:

### `verify-email`

Verifies a user's email and grants them the appropriate role.

```typescript
// supabase/functions/verify-email/index.ts
import { serve } from 'https://deno.land/std@0.170.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { token } = await req.json()
    
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    
    // Verify the email with the token
    const { data, error } = await supabaseAdmin.auth.verifyOtp({
      token_hash: token,
      type: 'email',
    })
    
    if (error) {
      throw error
    }
    
    // Update the user's role in the profiles table
    const userId = data.user?.id
    if (userId) {
      await supabaseAdmin
        .from('profiles')
        .update({ email_verified: true })
        .eq('id', userId)
    }
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
```

### `process-notification`

Processes and sends notifications to users.

```typescript
// supabase/functions/process-notification/index.ts
import { serve } from 'https://deno.land/std@0.170.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

serve(async (req) => {
  try {
    const { type, recipientId, data } = await req.json()
    
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    
    // Define notification templates based on type
    const templates = {
      'new_connection': {
        title: 'New Connection Request',
        message: `You have a new connection request from ${data.requesterName}`,
      },
      'connection_accepted': {
        title: 'Connection Accepted',
        message: `${data.recipientName} has accepted your connection request`,
      },
      'new_feedback': {
        title: 'New Feedback Received',
        message: `You've received feedback on your pitch "${data.pitchTitle}"`,
      },
      // Add more templates as needed
    }
    
    const template = templates[type]
    if (!template) {
      throw new Error(`Unknown notification type: ${type}`)
    }
    
    // Create the notification
    const { data: notification, error } = await supabaseAdmin
      .from('notifications')
      .insert({
        user_id: recipientId,
        type,
        title: template.title,
        message: template.message,
        data,
        is_read: false,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()
    
    if (error) {
      throw error
    }
    
    // Here you could also send an email or push notification
    
    return new Response(JSON.stringify({ success: true, notification }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
```

## Scheduled Jobs

Scheduled jobs run PostgreSQL functions on a defined schedule. The following jobs are configured:

### `update_user_activity_stats`

Updates user activity statistics daily.

```sql
CREATE OR REPLACE FUNCTION public.update_user_activity_stats()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update last activity for inactive users
  UPDATE public.user_progress
  SET last_active = NOW()
  WHERE (NOW() - last_active) > interval '30 days';
  
  -- Other maintenance tasks
  -- ...
END;
$$;
```

Scheduled to run daily at midnight:

```
0 0 * * * public.update_user_activity_stats()
```

### `clean_expired_invitations`

Removes expired invitations weekly.

```sql
CREATE OR REPLACE FUNCTION public.clean_expired_invitations()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete connection requests older than 30 days that haven't been accepted
  DELETE FROM public.connections
  WHERE 
    status = 'pending' AND 
    (NOW() - created_at) > interval '30 days';
END;
$$;
```

Scheduled to run weekly on Sunday at midnight:

```
0 0 * * 0 public.clean_expired_invitations()
```

## Implementation Guidelines

When implementing serverless features in Supabase, follow these guidelines:

### Database Functions

1. Use `SECURITY DEFINER` for functions that need elevated privileges.
2. Always set `search_path` to prevent SQL injection.
3. Implement proper error handling with `BEGIN/EXCEPTION` blocks.
4. Document the function's purpose, parameters, and return values.
5. Use schemas to organize functions by domain.

### Database Triggers

1. Keep triggers lightweight to avoid performance issues.
2. Implement idempotent operations that can safely run multiple times.
3. Handle edge cases like NULL values.
4. Test triggers thoroughly with different data scenarios.

### Edge Functions

1. Follow the Deno runtime conventions.
2. Implement proper error handling and validation.
3. Set appropriate CORS headers for web clients.
4. Use environment variables for configuration.
5. Keep functions focused on a single responsibility.

### Scheduled Jobs

1. Plan job frequency based on business needs and database load.
2. Monitor job execution and failures.
3. Implement logging for debugging purposes.
4. Design jobs to complete within reasonable timeframes.

## Testing & Debugging

### Testing Database Functions

You can test database functions directly in the Supabase SQL editor:

```sql
-- Test the unlock_achievement function
SELECT * FROM public.unlock_achievement('user-uuid', 'achievement-uuid');

-- Test the get_user_achievements function
SELECT * FROM public.get_user_achievements('user-uuid');
```

### Testing Edge Functions

1. Use the Supabase CLI for local development:

```bash
supabase functions serve verify-email --env-file .env.local
```

2. Make test requests with curl:

```bash
curl -X POST http://localhost:54321/functions/v1/verify-email \
  -H "Content-Type: application/json" \
  -d '{"token": "test-token"}'
```

### Debugging Tips

1. Use `RAISE NOTICE` in PostgreSQL functions to log debug information.
2. Add `console.log` statements in Edge Functions for debugging.
3. Monitor function execution in the Supabase dashboard.
4. Check logs for errors and performance issues.
5. Use transactions where appropriate to ensure data consistency. 
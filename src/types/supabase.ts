export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          category: string
          created_at: string
          description: string
          icon: string | null
          id: string
          is_active: boolean
          requirements: Json | null
          title: string
          updated_at: string
          xp_points: number
        }
        Insert: {
          category?: string
          created_at?: string
          description: string
          icon?: string | null
          id?: string
          is_active?: boolean
          requirements?: Json | null
          title: string
          updated_at?: string
          xp_points?: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          icon?: string | null
          id?: string
          is_active?: boolean
          requirements?: Json | null
          title?: string
          updated_at?: string
          xp_points?: number
        }
        Relationships: []
      }
      connections: {
        Row: {
          connection_type: string | null
          created_at: string
          id: string
          message: string | null
          recipient_id: string
          requester_id: string
          status: string
          updated_at: string
        }
        Insert: {
          connection_type?: string | null
          created_at?: string
          id?: string
          message?: string | null
          recipient_id: string
          requester_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          connection_type?: string | null
          created_at?: string
          id?: string
          message?: string | null
          recipient_id?: string
          requester_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "connections_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          is_private: boolean
          pitch_id: string
          rating: number | null
          reviewer_id: string
          strengths: string[] | null
          suggestions: string | null
          updated_at: string
          weaknesses: string[] | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          is_private?: boolean
          pitch_id: string
          rating?: number | null
          reviewer_id: string
          strengths?: string[] | null
          suggestions?: string | null
          updated_at?: string
          weaknesses?: string[] | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          is_private?: boolean
          pitch_id?: string
          rating?: number | null
          reviewer_id?: string
          strengths?: string[] | null
          suggestions?: string | null
          updated_at?: string
          weaknesses?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_pitch_id_fkey"
            columns: ["pitch_id"]
            isOneToOne: false
            referencedRelation: "pitches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      funding_opportunities: {
        Row: {
          amount_description: string
          amount_max: number | null
          amount_min: number | null
          created_at: string
          description: string
          details: Json | null
          display_type: string
          equity: string | null
          fund_provider: string
          funding_type: string | null
          id: string
          image_url: string | null
          is_early_stage: boolean
          is_impact_focused: boolean
          location: string
          program_support: boolean
          relevant_links: string[] | null
          sector: string
          title: string
          updated_at: string
        }
        Insert: {
          amount_description: string
          amount_max?: number | null
          amount_min?: number | null
          created_at?: string
          description: string
          details?: Json | null
          display_type?: string
          equity?: string | null
          fund_provider: string
          funding_type?: string | null
          id?: string
          image_url?: string | null
          is_early_stage?: boolean
          is_impact_focused?: boolean
          location: string
          program_support?: boolean
          relevant_links?: string[] | null
          sector: string
          title: string
          updated_at?: string
        }
        Update: {
          amount_description?: string
          amount_max?: number | null
          amount_min?: number | null
          created_at?: string
          description?: string
          details?: Json | null
          display_type?: string
          equity?: string | null
          fund_provider?: string
          funding_type?: string | null
          id?: string
          image_url?: string | null
          is_early_stage?: boolean
          is_impact_focused?: boolean
          location?: string
          program_support?: boolean
          relevant_links?: string[] | null
          sector?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      interests: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      investor_opportunity_links: {
        Row: {
          created_at: string
          id: string
          investor_id: string
          notes: string | null
          opportunity_id: string
          relationship_type: string | null
          relevance_score: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          investor_id: string
          notes?: string | null
          opportunity_id: string
          relationship_type?: string | null
          relevance_score?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          investor_id?: string
          notes?: string | null
          opportunity_id?: string
          relationship_type?: string | null
          relevance_score?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "investor_opportunity_links_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investor_opportunity_links_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "funding_opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      investor_profiles: {
        Row: {
          created_at: string
          investment_sizes: Json | null
          investment_stages: string[] | null
          investment_thesis: string | null
          portfolio: Json[] | null
          preferred_industries: string[] | null
          profile_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          investment_sizes?: Json | null
          investment_stages?: string[] | null
          investment_thesis?: string | null
          portfolio?: Json[] | null
          preferred_industries?: string[] | null
          profile_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          investment_sizes?: Json | null
          investment_stages?: string[] | null
          investment_thesis?: string | null
          portfolio?: Json[] | null
          preferred_industries?: string[] | null
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "investor_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      milestones: {
        Row: {
          achieved_date: string | null
          created_at: string
          description: string | null
          id: string
          importance: number
          startup_id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          achieved_date?: string | null
          created_at?: string
          description?: string | null
          id?: string
          importance?: number
          startup_id: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          achieved_date?: string | null
          created_at?: string
          description?: string | null
          id?: string
          importance?: number
          startup_id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "milestones_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          is_read: boolean
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean
          message: string
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pitch_tags: {
        Row: {
          created_at: string
          pitch_id: string
          tag_id: string
        }
        Insert: {
          created_at?: string
          pitch_id: string
          tag_id: string
        }
        Update: {
          created_at?: string
          pitch_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pitch_tags_pitch_id_fkey"
            columns: ["pitch_id"]
            isOneToOne: false
            referencedRelation: "pitches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitch_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      pitch_templates: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          funding_stage: string | null
          id: string
          industry: string[] | null
          is_public: boolean
          name: string
          sections: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          funding_stage?: string | null
          id?: string
          industry?: string[] | null
          is_public?: boolean
          name: string
          sections: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          funding_stage?: string | null
          id?: string
          industry?: string[] | null
          is_public?: boolean
          name?: string
          sections?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pitch_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pitches: {
        Row: {
          business_model: string | null
          competition: string | null
          created_at: string
          funding_ask: string | null
          id: string
          is_active: boolean
          market_size: string | null
          pitch_deck_url: string | null
          problem_statement: string | null
          solution_description: string | null
          startup_id: string
          status: string
          team_description: string | null
          title: string
          traction: string | null
          updated_at: string
          use_of_funds: string | null
          version: number
          video_url: string | null
        }
        Insert: {
          business_model?: string | null
          competition?: string | null
          created_at?: string
          funding_ask?: string | null
          id?: string
          is_active?: boolean
          market_size?: string | null
          pitch_deck_url?: string | null
          problem_statement?: string | null
          solution_description?: string | null
          startup_id: string
          status?: string
          team_description?: string | null
          title: string
          traction?: string | null
          updated_at?: string
          use_of_funds?: string | null
          version?: number
          video_url?: string | null
        }
        Update: {
          business_model?: string | null
          competition?: string | null
          created_at?: string
          funding_ask?: string | null
          id?: string
          is_active?: boolean
          market_size?: string | null
          pitch_deck_url?: string | null
          problem_statement?: string | null
          solution_description?: string | null
          startup_id?: string
          status?: string
          team_description?: string | null
          title?: string
          traction?: string | null
          updated_at?: string
          use_of_funds?: string | null
          version?: number
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pitches_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company_name: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          linkedin_url: string | null
          updated_at: string
          user_type: string
          website_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string
          email: string
          full_name: string
          id: string
          linkedin_url?: string | null
          updated_at?: string
          user_type: string
          website_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          linkedin_url?: string | null
          updated_at?: string
          user_type?: string
          website_url?: string | null
        }
        Relationships: []
      }
      saved_opportunities: {
        Row: {
          created_at: string | null
          funding_id: string
          id: string
          notes: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          funding_id: string
          id?: string
          notes?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          funding_id?: string
          id?: string
          notes?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_opportunities_funding_id_fkey"
            columns: ["funding_id"]
            isOneToOne: false
            referencedRelation: "funding_opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_opportunities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_pitches: {
        Row: {
          created_at: string
          id: string
          investor_id: string | null
          notes: string | null
          pitch_id: string
          shared_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          investor_id?: string | null
          notes?: string | null
          pitch_id: string
          shared_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          investor_id?: string | null
          notes?: string | null
          pitch_id?: string
          shared_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_pitches_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_pitches_pitch_id_fkey"
            columns: ["pitch_id"]
            isOneToOne: false
            referencedRelation: "pitches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_pitches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      startups: {
        Row: {
          created_at: string
          description: string | null
          founder_id: string
          founding_date: string | null
          funding_stage: string | null
          id: string
          industry: string[] | null
          logo_url: string | null
          name: string
          tagline: string | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          founder_id: string
          founding_date?: string | null
          funding_stage?: string | null
          id?: string
          industry?: string[] | null
          logo_url?: string | null
          name: string
          tagline?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          founder_id?: string
          founding_date?: string | null
          funding_stage?: string | null
          id?: string
          industry?: string[] | null
          logo_url?: string | null
          name?: string
          tagline?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "startups_founder_id_fkey"
            columns: ["founder_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          category: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          category?: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          created_at: string
          date_unlocked: string
          id: string
          progress: Json | null
          user_id: string
        }
        Insert: {
          achievement_id: string
          created_at?: string
          date_unlocked?: string
          id?: string
          progress?: Json | null
          user_id: string
        }
        Update: {
          achievement_id?: string
          created_at?: string
          date_unlocked?: string
          id?: string
          progress?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_interests: {
        Row: {
          created_at: string | null
          id: string
          interest_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          interest_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          interest_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_interests_interest_id_fkey"
            columns: ["interest_id"]
            isOneToOne: false
            referencedRelation: "interests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_interests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          created_at: string
          current_step: string | null
          id: string
          last_active: string | null
          onboarding_completed: boolean | null
          pitch_steps_completed: Json | null
          profile_completion: number | null
          profile_completion_date: string | null
          profile_completion_workflow_done: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_step?: string | null
          id?: string
          last_active?: string | null
          onboarding_completed?: boolean | null
          pitch_steps_completed?: Json | null
          profile_completion?: number | null
          profile_completion_date?: string | null
          profile_completion_workflow_done?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_step?: string | null
          id?: string
          last_active?: string | null
          onboarding_completed?: boolean | null
          pitch_steps_completed?: Json | null
          profile_completion?: number | null
          profile_completion_date?: string | null
          profile_completion_workflow_done?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_skills: {
        Row: {
          created_at: string | null
          id: string
          skill_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          skill_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          skill_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_skills_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_achievements_progress: {
        Args: { p_user_id: string }
        Returns: {
          achievement_id: string
          title: string
          description: string
          category: string
          xp_points: number
          progress: number
          progress_requirement: number
          is_qualified: boolean
        }[]
      }
      generate_typescript_types: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_connection_status: {
        Args: { user1_id: string; user2_id: string }
        Returns: string
      }
      get_pitch_completion: {
        Args: { p_pitch_id: string }
        Returns: {
          pitch_id: string
          title: string
          startup_name: string
          founder_id: string
          completed_sections: number
          total_sections: number
          completion_percentage: number
        }[]
      }
      get_rls_policies: {
        Args: { schema_name?: string }
        Returns: {
          schema_name: string
          table_name: string
          policy_name: string
          roles: string
          command: string
          policy_type: string
          using_expression: string
          with_check_expression: string
        }[]
      }
      get_user_achievement_summary: {
        Args: { p_user_id: string }
        Returns: {
          total_achievements: number
          unlocked_achievements: number
          completion_percentage: number
          total_xp: number
          achievements_by_category: Json
        }[]
      }
      get_user_achievements: {
        Args: { p_user_id: string }
        Returns: {
          id: string
          title: string
          description: string
          xp_points: number
          category: string
          icon: string
          is_unlocked: boolean
          date_unlocked: string
        }[]
      }
      get_user_connections: {
        Args: { user_id: string }
        Returns: {
          connection_id: string
          connected_user_id: string
          connected_user_name: string
          connected_user_avatar: string
          status: string
          is_requester: boolean
          created_at: string
        }[]
      }
      has_achievement: {
        Args: { p_user_id: string; p_achievement_id: string }
        Returns: boolean
      }
      is_founder: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_investor: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_policy_restrictive: {
        Args: { policy_name: string; table_name: string }
        Returns: boolean
      }
      mark_all_notifications_read: {
        Args: { input_user_id: string }
        Returns: number
      }
      unlock_achievement: {
        Args: { p_user_id: string; p_achievement_id: string }
        Returns: boolean
      }
      update_policy_type: {
        Args: {
          policy_name: string
          table_name: string
          schema_name: string
          make_restrictive: boolean
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

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
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          is_professional: boolean
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          is_professional?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          is_professional?: boolean
          created_at?: string
        }
      }
      professional_profiles: {
        Row: {
          id: string
          bio: string | null
          specialty: string | null
          location: string | null
          phone: string | null
          hourly_rate: number | null
          rating: number | null
          created_at: string
        }
        Insert: {
          id: string
          bio?: string | null
          specialty?: string | null
          location?: string | null
          phone?: string | null
          hourly_rate?: number | null
          rating?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          bio?: string | null
          specialty?: string | null
          location?: string | null
          phone?: string | null
          hourly_rate?: number | null
          rating?: number | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
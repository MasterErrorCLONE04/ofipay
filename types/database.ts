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
          years_experience: number | null
          is_active: boolean
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
          years_experience?: number | null
          is_active?: boolean
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
          years_experience?: number | null
          is_active?: boolean
          created_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          user_id: string
          content: string
          image_url: string | null
          likes_count: number
          comments_count: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          image_url?: string | null
          likes_count?: number
          comments_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          image_url?: string | null
          likes_count?: number
          comments_count?: number
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          post_id: string
          user_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          content?: string
          created_at?: string
        }
      }
      likes: {
        Row: {
          id: string
          post_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          created_at?: string
        }
      }
      follows: {
        Row: {
          id: string
          follower_id: string
          following_id: string
          created_at: string
        }
        Insert: {
          id?: string
          follower_id: string
          following_id: string
          created_at?: string
        }
        Update: {
          id?: string
          follower_id?: string
          following_id?: string
          created_at?: string
        }
      }
      stories: {
        Row: {
          id: string
          user_id: string
          image_url: string
          content: string | null
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          image_url: string
          content?: string | null
          expires_at: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          image_url?: string
          content?: string | null
          expires_at?: string
          created_at?: string
        }
      }
      story_views: {
        Row: {
          id: string
          story_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          story_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          story_id?: string
          user_id?: string
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
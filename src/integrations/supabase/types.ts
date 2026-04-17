export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      card_templates: {
        Row: {
          base_theme: string | null
          category: string
          colors: Json
          created_at: string | null
          fonts: Json
          id: string
          layout_json: Json
          name: string
          preview_image: string | null
        }
        Insert: {
          base_theme?: string | null
          category: string
          colors?: Json
          created_at?: string | null
          fonts?: Json
          id?: string
          layout_json?: Json
          name: string
          preview_image?: string | null
        }
        Update: {
          base_theme?: string | null
          category?: string
          colors?: Json
          created_at?: string | null
          fonts?: Json
          id?: string
          layout_json?: Json
          name?: string
          preview_image?: string | null
        }
        Relationships: []
      }
      charities: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          impact_message: string | null
          logo_url: string | null
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          impact_message?: string | null
          logo_url?: string | null
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          impact_message?: string | null
          logo_url?: string | null
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          name: string | null
          profile_photo: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          name?: string | null
          profile_photo?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          profile_photo?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          charity_id: string
          created_at: string | null
          id: string
          status: string
          user_card_id: string
        }
        Insert: {
          amount: number
          charity_id: string
          created_at?: string | null
          id?: string
          status?: string
          user_card_id: string
        }
        Update: {
          amount?: number
          charity_id?: string
          created_at?: string | null
          id?: string
          status?: string
          user_card_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_card_id_fkey"
            columns: ["user_card_id"]
            isOneToOne: false
            referencedRelation: "user_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      user_cards: {
        Row: {
          charity_id: string | null
          closing: string | null
          color_palette: Json | null
          created_at: string | null
          donation_amount: number | null
          envelope_color: string | null
          font_choice: string | null
          id: string
          message_body: string | null
          message_headline: string | null
          photo_url: string | null
          scheduled_at: string | null
          sent_at: string | null
          signature_style: string | null
          template_id: string | null
          texture: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          charity_id?: string | null
          closing?: string | null
          color_palette?: Json | null
          created_at?: string | null
          donation_amount?: number | null
          envelope_color?: string | null
          font_choice?: string | null
          id?: string
          message_body?: string | null
          message_headline?: string | null
          photo_url?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          signature_style?: string | null
          template_id?: string | null
          texture?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          charity_id?: string | null
          closing?: string | null
          color_palette?: Json | null
          created_at?: string | null
          donation_amount?: number | null
          envelope_color?: string | null
          font_choice?: string | null
          id?: string
          message_body?: string | null
          message_headline?: string | null
          photo_url?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          signature_style?: string | null
          template_id?: string | null
          texture?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_cards_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_cards_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "card_templates"
            referencedColumns: ["id"]
          },
        ]
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

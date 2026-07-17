export type LeadStatus = "new" | "contacted" | "converted";

export type Lead = {
  id: string;
  name: string;
  contact: string;
  vehicle_interest: string;
  ghana_city: string;
  status: LeadStatus;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: Lead;
        Insert: Omit<Lead, "id" | "created_at" | "status"> & {
          id?: string;
          created_at?: string;
          status?: LeadStatus;
        };
        Update: Partial<Omit<Lead, "id">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};

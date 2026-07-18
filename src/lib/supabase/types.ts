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

export type UserRole = "customer" | "admin";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  created_at: string;
};

export type OrderStage = "auction" | "container" | "roro" | "towing" | "delivered";

export type Order = {
  id: string;
  user_id: string;
  lead_id: string | null;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: string;
  auction_source: string | null;
  vin: string | null;
  stage: OrderStage;
  deposit_amount: number;
  balance_amount: number;
  deposit_paid: boolean;
  balance_paid: boolean;
  created_at: string;
};

export type OrderUpdate = {
  id: string;
  order_id: string;
  stage: OrderStage;
  note: string | null;
  photo_urls: string[];
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
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at" | "role" | "full_name"> & {
          created_at?: string;
          role?: UserRole;
          full_name?: string | null;
        };
        Update: Partial<Omit<Profile, "id">>;
        Relationships: [];
      };
      orders: {
        Row: Order;
        Insert: Omit<
          Order,
          | "id"
          | "created_at"
          | "stage"
          | "deposit_amount"
          | "balance_amount"
          | "deposit_paid"
          | "balance_paid"
          | "lead_id"
          | "auction_source"
          | "vin"
        > & {
          id?: string;
          created_at?: string;
          stage?: OrderStage;
          deposit_amount?: number;
          balance_amount?: number;
          deposit_paid?: boolean;
          balance_paid?: boolean;
          lead_id?: string | null;
          auction_source?: string | null;
          vin?: string | null;
        };
        Update: Partial<Omit<Order, "id">>;
        Relationships: [];
      };
      order_updates: {
        Row: OrderUpdate;
        Insert: Omit<OrderUpdate, "id" | "created_at" | "note" | "photo_urls"> & {
          id?: string;
          created_at?: string;
          note?: string | null;
          photo_urls?: string[];
        };
        Update: Partial<Omit<OrderUpdate, "id">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};

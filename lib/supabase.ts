import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ContentBlock = {
  id: string;
  block_key: string;
  content: string;
  updated_at: string;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  image_url: string;
  category: string;
  description: string;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
};

export type Testimonial = {
  id: string;
  customer_name: string;
  content: string;
  rating: number;
  location: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

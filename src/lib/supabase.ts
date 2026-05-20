import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabasePublishable = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabaseSecret = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

// Browser + server insert client (uses publishable / anon key)
// RLS policy on leads allows public INSERT, blocks SELECT/UPDATE/DELETE.
export const supabase = supabaseUrl && supabasePublishable
  ? createClient(supabaseUrl, supabasePublishable, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

// Optional server-only admin client (for reading leads, updating status, etc.)
// Only available when SUPABASE_SERVICE_ROLE_KEY is set.
export const supabaseAdmin = supabaseUrl && supabaseSecret
  ? createClient(supabaseUrl, supabaseSecret, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishable);
export const isSupabaseAdminConfigured = Boolean(supabaseUrl && supabaseSecret);

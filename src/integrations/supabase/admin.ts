import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!; // server-only secret

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  // do not throw in client builds; keep safe
  console.warn('Supabase server key is not present in server env for admin client')
}

export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
  auth: { persistSession: false },
});

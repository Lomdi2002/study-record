import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://apovdmhmvqcdbjzarutp.supabase.co";

const supabaseKey = "sb_publishable_vwpRXVQ25tX-4KQpXJ5DOA_DMs2kLbR";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
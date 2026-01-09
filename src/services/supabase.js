import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://tqacfbpvivjqriaczssk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxYWNmYnB2aXZqcXJpYWN6c3NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MDc2MzcsImV4cCI6MjA4MDE4MzYzN30.gr5f1OpFrzlvqZmRA6phxqIblvj9oR0kkLy7pJvrTPg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

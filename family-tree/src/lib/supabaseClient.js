import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zmtksvhiqfirhagwkoqz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptdGtzdmhpcWZpcmhhZ3drb3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3OTM0OTcsImV4cCI6MjA2NDM2OTQ5N30.1kRbpPmS8fkjZGfDgIeQ8_GkOiDTTz775m1bcr931mY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

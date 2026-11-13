import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://icvwrgkjkkkliumysuar.supabase.co';
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_yoJfHqnf3-ciFxiN85sa6Q_AFKvf8a3';

export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

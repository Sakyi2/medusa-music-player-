// api/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gmrxlmbdkkzqbbjckysi.supabase.co/rest/v1/';
const supabasePublishableKey = 'sb_publishable_dUGW_IfcXck2OeghZ43xPA_6yC-A42A'; // Use your full publishable key from the dashboard

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
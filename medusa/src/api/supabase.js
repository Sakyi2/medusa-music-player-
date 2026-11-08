// src/api/supabase.js
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://fkwvughynosasnlckauv.supabase.co';
const supabaseAnonKey = 'sb_publishable_T_HbPYh0QV0Wm33QSr6xnQ_BKLZoD2G';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
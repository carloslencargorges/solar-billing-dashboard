// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://bucmqafvumzlzujdjrtu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1Y21xYWZ2dW16bHp1amRqcnR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2MjUxNDMsImV4cCI6MjA0NzIwMTE0M30.SdNOgujU11aKSYIYhNs6d0nTMIHudx-pZL9thjsbQmk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
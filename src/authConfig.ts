import { createClient } from '@supabase/supabase-js';
import siteConfig from '@generated/docusaurus.config';

const { SUPABASE_URL, SUPABASE_ANON_KEY } =
  siteConfig.customFields as { SUPABASE_URL?: string, SUPABASE_ANON_KEY?: string };

export const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);

import { createClient } from '@supabase/supabase-js';
import siteConfig from '@generated/docusaurus.config';

const { SUPABASE_URL, SUPABASE_ANON_KEY, API: CUSTOM_API } =
  siteConfig.customFields as { SUPABASE_URL?: string, SUPABASE_ANON_KEY?: string, API?: string };

const clientOptions: Record<string, unknown> = {};
if (typeof window === 'undefined' && typeof process !== 'undefined') {
  const nodeMajor = Number(process.versions.node.split('.')[0]);
  if (nodeMajor < 22) {
    try {
      clientOptions.realtime = { transport: require('ws') };
    } catch (error) {
      console.warn('Supabase realtime transport not available:', error);
    }
  }
}

export const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, clientOptions);
export const API = CUSTOM_API || '';

import api from './base';
import { API, supabase } from '../authConfig';
import { Document } from './document';
import { TimedTopic } from './timed_topic';

export interface UserProps {
  class?: string;
  groups: string[];
}

export interface User extends UserProps {
  id: number | string;
  email: string;
  admin: boolean;
  created_at: string;
  updated_at: string;
}

const useSupabase = API === '';

function axiosLike<T>(data: T) {
  return Promise.resolve({ data });
}

export function user() {
  if (!useSupabase) {
    return api.get('user');
  }

  return (async () => {
    const sessionResult = await supabase.auth.getSession();
    const user = sessionResult.data.session?.user;
    if (!user?.id) {
      throw new Error('No authenticated Supabase user');
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('id, email, admin, class, groups, created_at, updated_at')
      .eq('id', user.id)
      .single();

    if (error) {
      throw error;
    }

    return axiosLike(profile);
  })();
}

export function data() {
  if (!useSupabase) {
    return api.get('user/data');
  }

  return (async () => {
    const sessionResult = await supabase.auth.getSession();
    const user = sessionResult.data.session?.user;
    if (!user?.id) {
      throw new Error('No authenticated Supabase user');
    }

    const [{ data: profile, error: userError }, { data: documents, error: docsError }, { data: timed_topics, error: topicsError }] = await Promise.all([
      supabase
        .from('profiles')
        .select('id, email, admin, class, groups, created_at, updated_at')
        .eq('id', user.id)
        .single(),
      supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id),
      supabase
        .from('timed_topics')
        .select('*')
        .eq('user_id', user.id),
    ]);

    if (userError) {
      throw userError;
    }
    if (docsError) {
      throw docsError;
    }
    if (topicsError) {
      throw topicsError;
    }

    return axiosLike({
      user: profile,
      documents: documents ?? [],
      timed_topics: timed_topics ?? [],
    });
  })();
}
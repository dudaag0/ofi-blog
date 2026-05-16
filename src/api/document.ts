import api from './base';
import { CancelTokenSource } from 'axios';
import { DocType } from '../models/iModel';
import { API, supabase } from '../authConfig';

export interface Version<T> {
    version: string /** ISO Date */;
    data: T;
    pasted: boolean;
}

export interface Document<T> {
    id: number | string;
    user_id: number | string;
    web_key: string;
    type: DocType;
    data: T;
    versions: Version<T>[];
    created_at: string;
    updated_at: string;
}

const useSupabase = API === '';

function axiosLike<T>(data: T) {
    return Promise.resolve({ data });
}

export function getDocument<T>(
    webKey: string,
    versions: boolean,
    cancelToken: CancelTokenSource
) {
    if (!useSupabase) {
        return api.get(`document/${webKey}?versions=${versions}`, { cancelToken: cancelToken.token });
    }

    return (async () => {
        const sessionResult = await supabase.auth.getSession();
        const user = sessionResult.data.session?.user;
        if (!user?.id) {
            throw new Error('No authenticated Supabase user');
        }

        const { data, error } = await supabase
            .from('documents')
            .select('*')
            .eq('web_key', webKey)
            .maybeSingle();

        if (error) {
            throw error;
        }

        return axiosLike(data ?? null as any);
    })();
}

export function postDocument<T>(
    webKey: string,
    type: DocType,
    data: T,
    cancelToken: CancelTokenSource
) {
    if (!useSupabase) {
        return api.post(
            'document',
            {
                web_key: webKey,
                data: data,
                type: type,
            },
            { cancelToken: cancelToken.token }
        );
    }

    return (async () => {
        const sessionResult = await supabase.auth.getSession();
        const user = sessionResult.data.session?.user;
        if (!user?.id) {
            throw new Error('No authenticated Supabase user');
        }

        const { data: inserted, error } = await supabase
            .from('documents')
            .insert({
                user_id: user.id,
                web_key: webKey,
                type,
                data,
            })
            .select('*')
            .single();

        if (error) {
            throw error;
        }

        return axiosLike({ ...inserted, versions: [] });
    })();
}

export function putDocument<T extends Object = Object>(
    webKey: string,
    data: T,
    snapshot: boolean,
    pasted: boolean,
    cancelToken: CancelTokenSource
) {
    if (!useSupabase) {
        const payload: { data: T; snapshot?: boolean; pasted?: boolean } = { data };
        if (snapshot) {
            payload.snapshot = snapshot;
        }
        if (pasted) {
            payload.pasted = pasted;
        }
        return api.put(
            `document/${webKey}`,
            payload,
            { cancelToken: cancelToken.token }
        );
    }

    return (async () => {
        const sessionResult = await supabase.auth.getSession();
        const user = sessionResult.data.session?.user;
        if (!user?.id) {
            throw new Error('No authenticated Supabase user');
        }

        const { error } = await supabase
            .from('documents')
            .update({ data })
            .eq('web_key', webKey);

        if (error) {
            throw error;
        }

        return axiosLike({ updated_at: new Date().toISOString(), state: 'ok' });
    })();
}

export function deleteDocument(webKey: string, cancelToken: CancelTokenSource) {
    if (!useSupabase) {
        return api.delete(`document/${webKey}`, { cancelToken: cancelToken.token });
    }

    return (async () => {
        const { error } = await supabase
            .from('documents')
            .delete()
            .eq('web_key', webKey);

        if (error) {
            throw error;
        }

        return axiosLike({});
    })();
}

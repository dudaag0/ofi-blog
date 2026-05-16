import React, { useEffect } from "react";
import { StoresProvider, rootStore } from "../stores/stores";
import { observer } from "mobx-react-lite";
import { supabase } from "../authConfig";
import useIsBrowser from "@docusaurus/useIsBrowser";
import Head from "@docusaurus/Head";
import siteConfig from '@generated/docusaurus.config';
const { OFFLINE_MODE } = siteConfig.customFields as { OFFLINE_MODE?: boolean };

export const CommentContext = React.createContext(true);
export const CommentProvider = CommentContext.Provider;

type RootProps = {
    children: React.ReactNode;
};

function Root({ children }: RootProps) {
    const isBrowser = useIsBrowser();

    useEffect(() => {
        if (!isBrowser || OFFLINE_MODE) {
            return;
        }

        const auth = supabase.auth as any;
        let subscription: any;

        const initAuth = async () => {
            const sessionResponse = await (auth.getSession?.() ?? auth.session?.());
            const data = sessionResponse?.data ?? sessionResponse;
            const error = sessionResponse?.error;

            if (error) {
                console.warn('Supabase auth initialization failed', error);
            } else if (data?.session?.user || data?.user) {
                const user = data?.session?.user ?? data?.user;
                rootStore.msalStore.setAccount({
                    username: user.email ?? user.id,
                    name: user.user_metadata?.full_name ?? user.email ?? user.id,
                });
            }

            const subscriptionResponse = auth.onAuthStateChange((_event: any, session: any) => {
                if (session?.user) {
                    rootStore.msalStore.setAccount({
                        username: session.user.email ?? session.user.id,
                        name: session.user.user_metadata?.full_name ?? session.user.email ?? session.user.id,
                    });
                } else {
                    rootStore.msalStore.setAccount(undefined);
                }
            });
            subscription = subscriptionResponse?.data?.subscription;
        };

        initAuth();

        return () => {
            subscription?.unsubscribe?.();
        };
    }, [isBrowser]);

    if (isBrowser && !(window as any).store) {
        (window as any).store = rootStore;
    }

    return (
        <div>
            <Head>
                <meta property="og:description" content="Informatik Gymnasium Biel-Seeland" />
                <meta
                    property="og:image"
                    content="https://ofi.gbsl.website/img/og-preview.png"
                />
            </Head>
            <StoresProvider value={rootStore}>
                <CommentProvider value={true}>
                    {children}
                </CommentProvider>
            </StoresProvider>
        </div>
    );
}

export default observer(Root);

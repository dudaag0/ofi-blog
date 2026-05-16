import axios, { CancelTokenSource } from 'axios';
import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import { RootStore } from './stores';
import api, { isLive } from '../api/base';
import { umamiReport } from '../helpers/umami';
import { User } from '../api/user';
import { supabase } from '../authConfig';

export type AuthAccount = {
    username: string;
    name: string;
    [key: string]: any;
};

export class MSALStore {
    private readonly root: RootStore;
    @observable.ref
    account?: AuthAccount;

    @observable
    offlineMode = false;

    @observable
    isApiOffline: boolean = false;

    @observable.ref
    offlineSince?: Date = undefined;

    @observable
    offlineStateConfirmed = false;
    cancelToken: CancelTokenSource = axios.CancelToken.source();

    constructor(root: RootStore) {
        makeObservable(this);
        this.root = root;

        reaction(
            () => this.offlineTimer,
            (offlineTime) => {
                if (!offlineTime) {
                    return;
                }
                this.cancelToken.cancel();
                this.cancelToken = axios.CancelToken.source();
                isLive(this.cancelToken)
                    .then((res) => {
                        if (res.status === 200) {
                            runInAction(() => {
                                this.setApiOfflineState(false);
                                this.offlineStateConfirmed = false;
                            });
                        }
                    })
                    .catch(() => {
                        return;
                    });
                if (offlineTime > 20000 && window && !this.offlineStateConfirmed) {
                    const reload = window.confirm(
                        'Die Seite ist seit mehr als 20s offline. Ihre Arbeit kann nicht gespeichert werden. Seite neu laden?'
                    );
                    if (reload) {
                        window.location.reload();
                    } else {
                        runInAction(() => {
                            this.offlineStateConfirmed = true;
                        });
                    }
                }
            }
        );
    }

    @action
    setApiOfflineState(offline: boolean) {
        if (this.offlineMode) {
            this.offlineSince = undefined;
            return;
        }
        if (this.isApiOffline !== offline) {
            this.isApiOffline = offline;
            if (offline) {
                this.offlineSince = new Date();
                umamiReport('device-offline', { time: this.offlineSince.toISOString(), userId: this.root.userStore.current?.id });
            } else {
                const period = this.offlineSince ? Date.now() - this.offlineSince.getTime() : -1;
                this.offlineSince = undefined;
                umamiReport('device-online-after', { after: period, userId: this.root.userStore.current?.id });
            }
        }
    }

    @computed
    get offlineTimer() {
        if (!this.offlineSince) {
            return;
        }
        const tspan = this.root.time_ms - this.offlineSince.getTime();
        return tspan < 0 ? 0 : tspan;
    }

    @action
    setAccount(account?: AuthAccount) {
        this.offlineMode = false;
        this.account = account;
    }

    @computed
    get loggedIn(): boolean {
        return !!this.account;
    }

    @action
    async login(email: string, password: string): Promise<{ error?: string; message?: string }> {
        const auth = supabase.auth as any;
        const { data, error } = await auth.signInWithPassword({ email, password });

        if (error) {
            console.warn(error);
            return { error: error.message ?? 'Login fehlgeschlagen' };
        }

        const user = data?.user;
        if (user) {
            this.setAccount({
                username: user.email ?? user.id,
                name: user.user_metadata?.full_name ?? user.email ?? user.id,
            });
        }

        return {};
    }

    @action
    async signup(email: string, password: string): Promise<{ error?: string; message?: string }> {
        const auth = supabase.auth as any;
        const { data, error } = await auth.signUp({ email, password });

        if (error) {
            console.warn(error);
            return { error: error.message ?? 'Registrierung fehlgeschlagen' };
        }

        const user = data?.user ?? data?.session?.user;
        if (user) {
            this.setAccount({
                username: user.email ?? user.id,
                name: user.user_metadata?.full_name ?? user.email ?? user.id,
            });
            return { message: 'Registrierung erfolgreich. Du bist jetzt eingeloggt.' };
        }

        return { message: 'Registrierung erfolgreich. Bitte bestätige deine E-Mail, um den Login abzuschließen.' };
    }

    @action
    async logout() {
        if (!this.loggedIn) {
            return;
        }
        const auth = supabase.auth as any;
        const { error } = await auth.signOut();
        if (error) {
            console.warn(error);
        }
        this.setAccount(undefined);
    }

    private async getSessionToken(): Promise<string | null> {
        const auth = supabase.auth as any;
        const response = await (auth.getSession?.() ?? auth.session?.());
        const data = response?.data ?? response;
        const error = response?.error;
        if (error) {
            console.error('Supabase session fetch failed', error);
            return null;
        }
        return data?.session?.access_token ?? null;
    }

    async withToken(): Promise<boolean> {
        if (this.offlineMode) {
            return true;
        }
        const token = await this.getSessionToken();
        if (token) {
            (api.defaults.headers as any).Authorization = `Bearer ${token}`;
            return true;
        }
        console.warn('No Login Token Found');
        return false;
    }

    @action
    loadOfflineData(data: User) {
        this.offlineMode = true;
        this.isApiOffline = false;
        this.offlineSince = undefined;
        this.offlineStateConfirmed = false;
        this.account = {
            username: data.email,
            name: data.email,
        };
    }
}

import {create} from "zustand";
import {supabase} from "@/lib/supabase";
import MyToast from "@/utils/MyToast";

type AuthStore = {
  user: any;
  loading: boolean;
  init: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, adminPassword: string) => Promise<any>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,

  init: async () => {
    set({loading: true});

    const {data, error} = await supabase.auth.getSession();

    if (error) {
      MyToast("error", error.message)
      return set({loading: false});
    }
    set({user: data.session?.user ?? null, loading: false});

    supabase.auth.onAuthStateChange((_event, session) => {
      set({user: session?.user ?? null});
    });
  },

  signIn: async (email, password) => {
    set({loading: true});
    const {data, error} = await supabase.auth.signInWithPassword({email, password});
    if (error) {
      MyToast("error", error.message)
      set({loading: false});
      return null;
    }
    set({user: data.user, loading: false});
    return data;
  },

  signUp: async (email, password, adminPassword) => {
    set({loading: true});
    if (adminPassword !== process.env.EXPO_PUBLIC_ADMIN_PASSWORD) {
      MyToast("info", "You need admin password");
      set({loading: false});
      return null
    }
    const {data, error} = await supabase.auth.signUp({email, password});
    if (error) {
      MyToast("error", error.message)
      set({loading: false});
      return null;
    }
    set({user: data.user, loading: false});
    return data;
  },

  signOut: async () => {
    set({loading: true});
    await supabase.auth.signOut();
    set({user: null, loading: false});
  }
}))
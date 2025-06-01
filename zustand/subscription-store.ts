import {create} from 'zustand';
import {SubscriptionData} from "@/utils/interface";
import {supabase} from "@/lib/supabase";
import MyToast from "@/utils/MyToast";

type SubscriptionStore = {
  loading: boolean;
  subscriptions: SubscriptionData[];
  getSubscriptions: (uid: string) => void
}

export const useSubscriptionStore = create<SubscriptionStore>((set, get) => ({
  loading: false,
  subscriptions: [],

  getSubscriptions: async (uid: string) => {
    set({loading: true})

    const {data, error} = await supabase.rpc('get_all_subscriptions', {
      uid,
    })

    if (error) {
      MyToast("error", error.message)
      set({loading: false})
    }

    set({loading: false, subscriptions: data})
  }
}))
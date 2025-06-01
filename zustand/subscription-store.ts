import {create} from 'zustand';
import {supabase} from "@/lib/supabase";
import MyToast from "@/utils/MyToast";

type SubscriptionStore = {}

export const useSubscriptionStore = create<SubscriptionStore>((set, get) => ({}))
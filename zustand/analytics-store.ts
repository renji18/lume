import {create} from "zustand";
import {supabase} from "@/lib/supabase";
import MyToast from "@/utils/MyToast";
import {MonthlyOverview, YearlyOverview} from "@/utils/interface";


type AnalyticsStore = {
  loading: boolean;
  monthlyOverview: MonthlyOverview[];
  yearlyOverview: YearlyOverview[];
  getMonthlyOverview: (uid: string) => Promise<void>
  getYearlyOverview: (uid: string) => Promise<void>
}

export const useAnalyticsStore = create<AnalyticsStore>((set, get) => ({
  loading: false,
  yearlyOverview: [],
  monthlyOverview: [],

  getMonthlyOverview: async (uid: string) => {
    set({loading: true});

    const {data, error} = await supabase.rpc('get_monthly_overview', {
      uid,
    })

    if (error) {
      MyToast("error", error.message)
      set({loading: false})
    }

    set({loading: false, monthlyOverview: data})
  },

  getYearlyOverview: async (uid: string) => {
    set({loading: true});

    const {data, error} = await supabase.rpc('get_yearly_overview', {
      uid,
    })

    if (error) {
      MyToast("error", error.message)
      set({loading: false})
    }

    set({loading: false, yearlyOverview: data})
  }
}))
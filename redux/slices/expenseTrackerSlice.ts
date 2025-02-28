import { ExpenseData, SubscriptionData } from "@/utils/interface"
import { createSlice } from "@reduxjs/toolkit"

const initialState: {
  data: {
    expenses: Array<ExpenseData>
    subscription: Array<SubscriptionData>
  }
  loading: boolean
  error: any
  status: string
} = {
  data: { expenses: [], subscription: [] },
  loading: false,
  error: null,
  status: "",
}

const expenseTrackerSlice = createSlice({
  name: "ExpenseTracker",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setExpenseData: (state, action) => {
      state.data.expenses = action.payload
    },
    setSubscriptionsData: (state, action) => {
      state.data.subscription = action.payload
    },
    updateExpenseData: (state, action) => {
      state.data.expenses = [...state.data.expenses, action.payload]
    },
    updateSubscriptionsData: (state, action) => {
      state.data.subscription = [...state.data.subscription, action.payload]
    },
  },
})

export const {
  setExpenseData,
  setError,
  setLoading,
  updateExpenseData,
  setSubscriptionsData,
  updateSubscriptionsData,
} = expenseTrackerSlice.actions
export default expenseTrackerSlice.reducer

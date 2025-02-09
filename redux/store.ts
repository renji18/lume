import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useSelector } from "react-redux"
import expenseTrackerSlice from "./slices/expenseTrackerSlice"

export const store = configureStore({
  reducer: {
    expense: expenseTrackerSlice,
  },
})

export type MyDispatch = typeof store.dispatch

export const MySelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector

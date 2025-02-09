import { ExpenseData } from "@/utils/interface"
import { createSlice } from "@reduxjs/toolkit"

// Get All Files
// export const getAllFiles = createAsyncThunk(
//   "getAllFiles",
//   async (data: { eventId: string; userId: string }, { rejectWithValue }) => {
//     try {
//       const response = await getAllFilesOfEvents(data?.eventId, data?.userId)
//       return response
//     } catch (error: any) {
//       toast.error("Error Fetching All Files")
//       return rejectWithValue(error.response)
//     }
//   }
// )

const initialState: {
  data: Array<ExpenseData>
  loading: boolean
  error: any
  status: string
} = {
  data: [],
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
      state.data = action.payload
    },
    updateData: (state, action) => {
      state.data = [...state.data, action.payload]
    },
  },
})

export const { setExpenseData, setError, setLoading, updateData } =
  expenseTrackerSlice.actions
export default expenseTrackerSlice.reducer

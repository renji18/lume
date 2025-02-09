import { doc, getDoc, updateDoc } from "firebase/firestore"
import { firestore } from "./config"
import { errorHandler } from "./errors"
import { ExpenseData } from "@/utils/interface"

// the expenseDB reference
const expenseDBRef = doc(
  firestore,
  process.env.EXPO_PUBLIC_COLLECTION_NAME || "",
  process.env.EXPO_PUBLIC_EXPENSE_DOC_NAME || ""
)

// get expense data
export async function handleGetExpenseData() {
  try {
    const docSnap = await getDoc(expenseDBRef)
    return docSnap.data()?.["data"]
  } catch (error) {
    return { msg: errorHandler(error), error: true }
  }
}

// update expense data
export async function handleUpdateExpenseData(
  currentData: Array<ExpenseData>,
  newData: ExpenseData
) {
  try {
    await updateDoc(expenseDBRef, {
      data: [...currentData, newData],
    })
    return "Expenses updated successfully"
  } catch (error) {
    return { msg: errorHandler(error), error: true }
  }
}

import { doc, getDoc } from "firebase/firestore"
import { firestore } from "./config"
import { errorHandler } from "./errors"

// the expenseDB reference
const expenseDBRef = doc(
  firestore,
  process.env.EXPO_PUBLIC_COLLECTION_NAME || "",
  process.env.EXPO_PUBLIC_EXPENSE_DOC_NAME || ""
)

// get portfolio data
export async function handleGetExpenseData() {
  try {
    const docSnap = await getDoc(expenseDBRef)
    return docSnap.data()?.["data"]
  } catch (error) {
    return { msg: errorHandler(error), error: true }
  }
}

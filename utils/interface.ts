export interface ExpenseData {
  amount: number
  date: string
  mode: "online" | "cash"
  type: "-" | "+"
  reason: string
}

export interface ExpenseData {
  amount: number
  date: string
  mode: "online" | "cash"
  type: "-" | "+"
  reason: string
}

export interface SubscriptionData {
  type: "monthly" | "yearly"
  from: string
  to?: string
  name: string
  amount: number
}

export type Expense = {
  id: string;
  user_id: string;
  date: string;
  amount: number;
  mode: "online" | "offline";
  reason: string;
  type: "income" | "expense";
  created_at: string;
}

export type Transaction = {
  txn_date: string;
  txn_amount: number;
  txn_mode: "online" | "offline";
  txn_reason: string;
  txn_type: "income" | "expense";
}

export interface SubscriptionData {
  type: "monthly" | "yearly"
  from: string
  to?: string
  name: string
  amount: number
  subscription: 'trial' | 'paid'
}

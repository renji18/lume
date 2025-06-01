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
  id: string;
  user_id: string;
  type: "monthly" | "yearly"
  from_date: string
  to_date?: string
  name: string
  amount: number
  status: 'trial' | 'paid'
  created_at: string;
}

export interface YearlyOverview {
  net_balance: number;
  total_expense: number;
  total_income: number;
  year: number;
}

export interface MonthlyOverview {
  month: number;
  net_balance: number;
  total_expense: number;
  total_income: number;
  year: number;
}
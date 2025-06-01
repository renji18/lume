import {create} from 'zustand';
import {supabase} from "@/lib/supabase";
import MyToast from "@/utils/MyToast";
import {Expense, Transaction} from "@/utils/interface";

type DateRange = {
  start: string;
  end: string;
};

type TransactionStore = {
  transactionsByDate: Record<string, Expense[]>;
  fetchedRanges: DateRange[];
  newTxn: boolean;
  loading: boolean;
  getTransactionsForDate: (date: string, uid: string) => Promise<Expense[]>;
  createTransaction: (transaction: Transaction, uid: string) => Promise<boolean>;
};

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactionsByDate: {},
  fetchedRanges: [],
  newTxn: false,
  loading: false,

  getTransactionsForDate: async (date: string, uid: string) => {
    const state = get();
    if (state.transactionsByDate[date]) {
      return state.transactionsByDate[date];
    }

    const alreadyFetched = state.fetchedRanges.some(({start, end}) => {
      return date >= start && date <= end;
    });

    if (alreadyFetched) {
      return [];
    }

    set({loading: true});

    const {data, error} = await supabase.rpc('get_transactions_in_date_range', {
      uid,
      center_date: date,
    });

    if (error) {
      MyToast("error", error.message)
      set({loading: false});
      return [];
    }

    const newByDate: Record<string, Expense[]> = {...state.transactionsByDate};

    for (const txn of data) {
      const txnDate = txn.date;
      if (!newByDate[txnDate]) newByDate[txnDate] = [];
      newByDate[txnDate].push(txn);
    }

    const center = new Date(date);
    const pad = (d: Date) => d.toISOString().split('T')[0];

    const start = new Date(center);
    start.setDate(start.getDate() - 5);

    const end = new Date(center);
    end.setDate(end.getDate() + 5);

    const range: DateRange = {
      start: pad(start),
      end: pad(end),
    };

    set((prev) => ({
      transactionsByDate: newByDate,
      fetchedRanges: [...prev.fetchedRanges, range],
      loading: false,
    }));

    return newByDate[date] || [];
  },

  createTransaction: async (txn: Transaction, uid: string) => {
    set({loading: true});

    const {error} = await supabase.rpc('add_transaction', {
      uid,
      ...txn,
    });

    if (error) {
      MyToast("error", error.message)
      set({loading: false});
      return false;
    }

    const date = txn.txn_date;
    set(prev => {
      const updated = {...prev.transactionsByDate}

      const mapExpense: Expense = {
        id: uid + txn.txn_reason + Date.now().toLocaleString(),
        created_at: Date.now().toLocaleString(),
        date: txn.txn_date,
        type: txn.txn_type,
        amount: txn.txn_amount,
        mode: txn.txn_mode,
        reason: txn.txn_reason,
        user_id: uid
      }

      if (!updated[date]) {
        updated[date] = [mapExpense]
      } else {
        updated[date] = [...updated[date], mapExpense];
      }

      return {transactionsByDate: updated}
    })

    set({loading: false, newTxn: true});
    MyToast("success", "Transaction created");
    return true
  }
}))

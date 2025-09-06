import { FlatList, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import { Expense } from "@/utils/interface"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { useTransactionStore } from "@/zustand/transaction-store"
import { useAuthStore } from "@/zustand/auth-store"
import { getDayOfWeek, uiDateFormatter } from "@/utils/dateFormatter"

const ExpenseList = ({
  currentDate,
  setShowCalendar,
}: {
  currentDate: Date
  setShowCalendar: (arg: boolean) => void
}) => {
  const [currentData, setCurrentData] = useState<Array<Expense>>()
  const [totalExpense, setTotalExpense] = useState<number>(0)

  const { user } = useAuthStore()
  const { getTransactionsForDate, newTxn } = useTransactionStore()

  useEffect(() => {
    const fetchDataForDate = async () => {
      if (!currentDate || !user) return
      return getTransactionsForDate(
        currentDate.toISOString().split("T")[0],
        user.id
      )
    }
    fetchDataForDate().then((res) => {
      setCurrentData(res)
    })
  }, [currentDate, user.id, newTxn])

  useEffect(() => {
    if (!currentData) return
    const sum = currentData?.reduce((total, item) => {
      return item.type === "income" ? total + item.amount : total - item.amount
    }, 0)
    setTotalExpense(sum)
  }, [currentData])

  return (
    <View className={`h-full w-screen items-center`}>
      <TouchableOpacity
        onPress={() => setShowCalendar(true)}
        className="border-2 rounded-full my-8 px-4 py-2 border-blue"
      >
        <Text className="font-gb text-dark_slate text-3xl">
          {uiDateFormatter(currentDate)}
        </Text>
        <Text className="font-gb text-dark_slate text-xl text-center">
          {getDayOfWeek(new Date(currentDate).getDay())}
        </Text>
      </TouchableOpacity>
      <Text
        className={`font-gsb tracking-wide text-4xl ${
          totalExpense?.toString().startsWith("-") ? "text-loss" : "text-profit"
        }`}
      >
        ₹{totalExpense}
      </Text>

      <View className="flex-1 w-full mt-10">
        <FlatList
          data={currentData}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 50 }}
          ListEmptyComponent={
            <Text className="text-center text-dark_slate font-gbi text-2xl">
              No Expenses Today
            </Text>
          }
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center py-4 px-3 gap-2">
              <MaterialCommunityIcons
                name={
                  item.type === "income" && item.mode === "online"
                    ? "credit-card-plus-outline"
                    : item.type === "expense" && item.mode === "online"
                    ? "credit-card-minus-outline"
                    : item.type === "income" && item.mode === "offline"
                    ? "cash-plus"
                    : "cash-minus"
                }
                size={40}
                color={item.type === "income" ? "#1FAA59" : "#D72638"}
              />
              <Text className="capitalize text-dark_slate font-gi text-xl flex-1 text-center">
                {item.reason}
              </Text>
              <Text
                className={`font-gsb text-2xl ${
                  item.type === "income" ? "text-profit" : "text-loss"
                }`}
              >
                ₹{item.amount}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}

export default ExpenseList

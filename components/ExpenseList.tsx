
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import { ExpenseData } from "@/utils/interface"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

const ExpenseList = ({
                       currentDate,
                       currentData,
                       setShowCalendar,
                     }: {
  currentDate: string
  currentData?: Array<ExpenseData>
  setShowCalendar: (arg: boolean) => void
}) => {
  const [totalExpense, setTotalExpense] = useState<number>(0)

  useEffect(() => {
    if (!currentData) return
    const sum = currentData?.reduce((total, item) => {
      return item.type === "+" ? total + item.amount : total - item.amount
    }, 0)
    setTotalExpense(sum)
  }, [currentData])

  return (
    <View className={`h-full w-screen items-center`}>
      <TouchableOpacity
        onPress={() => setShowCalendar(true)}
        className="border-2 rounded-full my-8 px-4 py-2 border-blue"
      >
        <Text className="font-gb text-dark_slate text-4xl">{currentDate}</Text>
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
                  item.type === "+" && item.mode === "online"
                    ? "credit-card-plus-outline"
                    : item.type === "-" && item.mode === "online"
                      ? "credit-card-minus-outline"
                      : item.type === "+" && item.mode === "cash"
                        ? "cash-plus"
                        : "cash-minus"
                }
                size={40}
                color={item.type === "+" ? "#1FAA59" : "#D72638"}
              />
              <Text className="capitalize text-dark_slate font-gi text-xl flex-1 text-center">
                {item.reason}
              </Text>
              <Text
                className={`font-gsb text-2xl ${
                  item.type === "+" ? "text-profit" : "text-loss"
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

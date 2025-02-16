import { View, Text, FlatList, TouchableOpacity } from "react-native"
import React, { useCallback, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { MySelector } from "@/redux/store"
import { useFocusEffect } from "@react-navigation/native"

const Analyze = () => {
  const { data } = MySelector((state) => state.expense)

  const years = Object.values(
    data.reduce((acc, item) => {
      const [_, __, year] = item.date.split("/")
      const amount = Number(item.amount) * (item.type === "+" ? 1 : -1)

      if (!acc[year]) {
        acc[year] = { year, totalExpense: 0 }
      }
      acc[year].totalExpense += amount
      return acc
    }, {} as Record<string, { year: string; totalExpense: number }>)
  )

  const [selectedYear, setSelectedYear] = useState<string | null>(null)

  // to reset selected year
  useFocusEffect(
    useCallback(() => {
      setSelectedYear(null)
    }, [])
  )

  return (
    <SafeAreaView className="bg-theme-white flex-1 w-full items-center">
      {selectedYear ? (
        <View className="flex-1 bg-blue-800 w-full items-center">
          <Text>{selectedYear}</Text>
        </View>
      ) : (
        <View className="flex-1 w-[75%] mt-20">
          <FlatList
            data={years}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              <Text className="text-center text-theme-black font-gbi text-2xl">
                No Expenses Found
              </Text>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedYear(item.year)}
                className={`${
                  item.totalExpense < 0 ? "bg-rose-500" : "bg-emerald-500"
                } px-6 py-10 rounded-lg flex-row items-center justify-between my-10`}
              >
                <View>
                  <Text className="font-gi text-lg text-theme-black">Year</Text>
                  <Text className="font-gb text-2xl text-theme-black">
                    {item.year}
                  </Text>
                </View>
                <View>
                  <Text className="font-gi text-lg text-theme-black">
                    Total Expense
                  </Text>
                  <Text className="font-gb text-2xl text-theme-black">
                    ₹{item.totalExpense}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  )
}

export default Analyze

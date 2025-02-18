import { View, Text, FlatList, TouchableOpacity } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { MySelector } from "@/redux/store"
import { useFocusEffect } from "@react-navigation/native"
import AntDesign from "@expo/vector-icons/AntDesign"

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
  const [monthlyData, setMonthlyData] = useState<Array<{
    month: string
    totalExpense: number
  }> | null>(null)

  // to extract monthly data
  useEffect(() => {
    if (!selectedYear) {
      setMonthlyData(null)
      return
    }
    const allMonthsData = data.filter((item) => {
      const [_, __, year] = item.date.split("/")
      if (year === selectedYear) return item
    })

    const months = Object.values(
      allMonthsData.reduce((acc, item) => {
        const [_, month, __] = item.date.split("/")
        const amount = Number(item.amount) * (item.type === "+" ? 1 : -1)

        if (!acc[month]) {
          acc[month] = { month, totalExpense: 0 }
        }
        acc[month].totalExpense += amount
        return acc
      }, {} as Record<string, { month: string; totalExpense: number }>)
    )

    setMonthlyData(months)
  }, [selectedYear])

  // to reset selected year
  useFocusEffect(
    useCallback(() => {
      setSelectedYear(null)
    }, [])
  )

  return (
    <SafeAreaView className="bg-theme-white flex-1 w-full items-center">
      {selectedYear ? (
        <View className="flex-1 w-[75%] mt-10">
          <View className="relative">
            <TouchableOpacity
              onPress={() => setSelectedYear(null)}
              className="absolute h-full flex justify-center z-10"
            >
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-center text-theme-black text-3xl font-gm">
              Year {selectedYear}
            </Text>
          </View>
          <Text className="text-center text-theme-black text-3xl font-gm mt-5">
            Monthly Analysis
          </Text>
          <FlatList
            data={monthlyData}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 20, paddingTop: 20 }}
            ListEmptyComponent={
              <Text className="text-center text-theme-black font-gbi text-2xl">
                No Expenses Found
              </Text>
            }
            renderItem={({ item }) => (
              <View
                className={`${
                  item.totalExpense < 0 ? "bg-rose-500" : "bg-emerald-500"
                } px-6 py-10 rounded-lg flex-row items-center justify-between my-5`}
              >
                <View>
                  <Text className="font-gi text-lg text-theme-black">
                    Month
                  </Text>
                  <Text className="font-gb text-2xl text-theme-black">
                    {item.month}
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
              </View>
            )}
          />
        </View>
      ) : (
        <View className="flex-1 w-[75%] mt-20">
          <Text className="text-center text-3xl font-gm text-theme-black">
            Yearly Analysis
          </Text>
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

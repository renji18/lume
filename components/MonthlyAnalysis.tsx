import {FlatList, Text, TouchableOpacity, View} from "react-native"
import AntDesign from "@expo/vector-icons/AntDesign"
import {getMonthName} from "@/utils/getMonthName"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import {useEffect, useState} from "react";
import {MonthlyOverview} from "@/utils/interface";
import {useAnalyticsStore} from "@/zustand/analytics-store";

const MonthlyAnalysis = ({selectedYear, setSelectedYear,}: {
  selectedYear: number
  setSelectedYear: (arg: number | null) => void
}) => {
  const {monthlyOverview} = useAnalyticsStore()

  const [monthlyData, setMonthlyData] = useState<Array<MonthlyOverview> | null>(null)

  useEffect(() => {
    if (!monthlyOverview) return
    setMonthlyData(monthlyOverview.filter((x) => (x: MonthlyOverview) => x.year === selectedYear
    ))
  }, [monthlyOverview])

  if (!monthlyData) return null

  return (
    <View className="flex-1 w-[75%] mt-10">
      <View className="relative">
        <TouchableOpacity
          onPress={() => setSelectedYear(null)}
          className="absolute h-full flex justify-center z-10"
        >
          <AntDesign name="left" size={24} color="#2c2c2c"/>
        </TouchableOpacity>
        <Text className="text-center text-dark_slate text-3xl font-gm">
          Year {selectedYear}
        </Text>
      </View>
      <Text className="text-center text-dark_slate text-3xl font-gm my-5">
        Monthly Analysis
      </Text>
      <FlatList
        data={monthlyData}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{paddingBottom: 20, paddingTop: 20}}
        ListEmptyComponent={
          <Text className="text-center text-dark_slate font-gbi text-2xl">
            No Expenses Found
          </Text>
        }
        renderItem={({item}) => (
          <View
            className={`${
              item.net_balance < 0 ? "bg-loss" : "bg-profit"
            } rounded-lg mb-10 last:mb-5`}
          >
            <View className="flex-row items-center justify-between px-6 py-4">
              <Text className="font-gb text-2xl text-beige">
                {getMonthName(item.month)}
              </Text>
              <Text className="font-gb text-2xl text-soft_white">
                ₹{item.net_balance}
              </Text>
            </View>
            <View className="border-t border-t-beige px-4 py-3 flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons
                  name="bank-plus"
                  size={24}
                  color="#f5e6ca"
                />
                <Text className="text-soft_white font-gsb text-2xl">
                  ₹{item.total_income}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons
                  name="bank-minus"
                  size={24}
                  color="#f5e6ca"
                />
                <Text className="text-soft_white font-gsb text-2xl">
                  ₹{item.total_expense}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  )
}

export default MonthlyAnalysis

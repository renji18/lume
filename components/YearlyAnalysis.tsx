import {FlatList, Text, TouchableOpacity, View} from "react-native"
import {useAnalyticsStore} from "@/zustand/analytics-store";

const YearlyAnalysis = ({setSelectedYear,}: {
  setSelectedYear: (arg: number | null) => void
}) => {

  const {yearlyOverview} = useAnalyticsStore()

  return (
    <View className="flex-1 w-[75%] mt-10">
      <Text className="text-center text-3xl font-gm text-dark_slate mb-5">
        Yearly Analysis
      </Text>
      <FlatList
        data={yearlyOverview}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{paddingBottom: 20}}
        ListEmptyComponent={
          <Text className="text-center text-dark_slate font-gbi text-2xl">
            No Expenses Found
          </Text>
        }
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => setSelectedYear(item.year)}
            className={`${
              item.net_balance < 0 ? "bg-loss" : "bg-profit"
            } p-6 rounded-lg my-10`}
          >
            <View className="flex-row justify-between items-center">
              <Text className="font-gb text-3xl text-soft_white">
                {item.year}
              </Text>

              <Text className="font-gb text-2xl text-soft_white">
                ₹{item.net_balance}
              </Text>
            </View>
            <View className="flex-row justify-between items-center mt-1">
              <View>
                <Text className="text-soft_white font-gm">Total Income</Text>
                <Text className="text-soft_white font-gm">₹{item.total_income}</Text>
              </View>
              <View>
                <Text className="text-soft_white font-gm">Total Expense</Text>
                <Text className="text-soft_white font-gm">₹{item.total_expense}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default YearlyAnalysis

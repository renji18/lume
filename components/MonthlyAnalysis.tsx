import { View, Text, TouchableOpacity, FlatList } from "react-native"
import AntDesign from "@expo/vector-icons/AntDesign"
import { getMonthShortName } from "@/utils/getMonthName"

const MonthlyAnalysis = ({
  selectedYear,
  setSelectedYear,
  monthlyData,
}: {
  selectedYear: string
  setSelectedYear: (arg: string | null) => void
  monthlyData: Array<{
    month: string
    totalExpense: number
  }> | null
}) => {
  return (
    <View className="flex-1 w-[75%] mt-10">
      <View className="relative">
        <TouchableOpacity
          onPress={() => setSelectedYear(null)}
          className="absolute h-full flex justify-center z-10"
        >
          <AntDesign name="left" size={24} color="#2c2c2c" />
        </TouchableOpacity>
        <Text className="text-center text-dark_slate text-3xl font-gm">
          Year {selectedYear}
        </Text>
      </View>
      <Text className="text-center text-dark_slate text-3xl font-gm mt-5">
        Monthly Analysis
      </Text>
      <FlatList
        data={monthlyData}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 20 }}
        ListEmptyComponent={
          <Text className="text-center text-dark_slate font-gbi text-2xl">
            No Expenses Found
          </Text>
        }
        renderItem={({ item }) => (
          <View
            className={`${
              item.totalExpense < 0 ? "bg-loss" : "bg-profit"
            } px-6 py-10 rounded-lg flex-row items-center justify-between my-5`}
          >
            <View>
              <Text className="font-gi text-lg text-soft_white">Month</Text>
              <Text className="font-gb text-2xl text-soft_white">
                {getMonthShortName(item.month)}
              </Text>
            </View>
            <View>
              <Text className="font-gi text-lg text-soft_white">
                Total Expense
              </Text>
              <Text className="font-gb text-2xl text-soft_white">
                ₹{item.totalExpense}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  )
}

export default MonthlyAnalysis

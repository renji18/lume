import formattedExpense from "@/utils/parseFloat"
import { View, Text, FlatList, TouchableOpacity } from "react-native"

const YearlyAnalysis = ({
  years,
  setSelectedYear,
}: {
  years: {
    year: string
    totalExpense: number
  }[]
  setSelectedYear: (arg: string | null) => void
}) => {
  return (
    <View className="flex-1 w-[75%] mt-10">
      <Text className="text-center text-3xl font-gm text-dark_slate mb-5">
        Yearly Analysis
      </Text>
      <FlatList
        data={years}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text className="text-center text-dark_slate font-gbi text-2xl">
            No Expenses Found
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedYear(item.year)}
            className={`${
              item.totalExpense < 0 ? "bg-loss" : "bg-profit"
            } p-6 rounded-lg flex-row items-center justify-between my-10`}
          >
            <Text className="font-gb text-3xl text-soft_white">
              {item.year}
            </Text>

            <Text className="font-gb text-2xl text-soft_white">
              ₹{formattedExpense(item.totalExpense)}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default YearlyAnalysis

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
  )
}

export default YearlyAnalysis

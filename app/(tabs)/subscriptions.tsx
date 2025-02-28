import { View, Text, FlatList } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { MySelector } from "@/redux/store"
import { getDateJs, uiDateFormatter } from "@/utils/dateFormatter"

const Subscriptions = () => {
  const {
    data: { subscription },
  } = MySelector((state) => state.expense)

  return (
    <SafeAreaView className="bg-theme-white flex-1 items-center w-full">
      <View className="w-[80%]">
        <Text className="font-gm mt-10 text-2xl text-theme-black text-center">
          Your Active Subscriptions
        </Text>
        <FlatList
          data={subscription}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 50 }}
          ListEmptyComponent={
            <Text className="font-gsb text-3xl my-10 text-center">
              You don't have any active Subscriptions
            </Text>
          }
          renderItem={({ item }) => (
            <View className="my-10 px-6 py-8 rounded-lg bg-theme-blue">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="capitalize text-theme-white font-gmi text-xl">
                    {item.type} from
                  </Text>
                  <Text className="text-theme-white font-gm text-2xl mt-1.5">
                    {uiDateFormatter(getDateJs(item.from))}
                  </Text>
                </View>
                <View>
                  <Text className="text-theme-white font-gmi text-3xl">
                    {item.name}
                  </Text>
                  <Text className="text-theme-white font-gm text-2xl text-right mt-1.5">
                    ₹{item.amount}
                  </Text>
                </View>
              </View>
              {item?.to && (
                <Text className="mt-5 text-center text-theme-black font-gsbi text-xl">
                  Ended on {item.to}
                </Text>
              )}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default Subscriptions

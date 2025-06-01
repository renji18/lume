import {FlatList, Text, View} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context"
import {uiDateFormatter} from "@/utils/dateFormatter"
import {timeSince} from "@/utils/montsPassed"
import {useSubscriptionStore} from "@/zustand/subscription-store";

const Subscriptions = () => {

  const {subscriptions} = useSubscriptionStore()

  return (
    <SafeAreaView className="bg-beige flex-1 items-center w-full">
      <View className="w-[80%]">
        <Text className="font-gm mt-10 mb-5 text-2xl text-dark_slate text-center">
          Your Active Subscriptions
        </Text>
        <FlatList
          data={subscriptions}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 50}}
          ListEmptyComponent={
            <Text className="font-gsb text-dark_slate text-3xl my-10 text-center">
              You don't have any active Subscriptions
            </Text>
          }
          renderItem={({item}) => (
            <View className="my-5 px-6 py-8 rounded-lg bg-blue">
              <View>
                <Text className="text-soft_white font-gbi text-3xl">
                  {item.name}
                </Text>
                <View className="flex-row items-center gap-1.5 mt-1.5">
                  <Text className="text-soft_white font-gm text-2xl">
                    ₹{item.amount}
                  </Text>
                  <Text className="capitalize text-soft_white font-gmi text-xl">
                    {item.type}
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-soft_white font-gsb text-2xl mt-1.5">
                  From {uiDateFormatter(new Date(item.from_date.toString()))}
                </Text>
              </View>
              {
                item.status === "trial"
                  ?
                  <Text className="mt-3 text-center font-gsbi text-xl text-soft_white">Currently on Trial</Text>
                  :
                  <Text className="mt-3 text-center font-gsbi text-xl text-soft_white">
                    Total spent ₹{timeSince(new Date(item.from_date), item.type) * item.amount}{" "}
                    for {timeSince(new Date(item.from_date), item.type)} {item.type === "monthly" ? "month/s" : "year/s"}
                  </Text>
              }
              {item?.to_date && (
                <Text className="mt-3 text-center text-soft_white font-gm text-xl">
                  Ended on {item.to_date}
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

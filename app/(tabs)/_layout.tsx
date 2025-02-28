import { View } from "react-native"
import React from "react"
import { Tabs } from "expo-router"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import Ionicons from "@expo/vector-icons/Ionicons"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#233337",
        tabBarInactiveTintColor: "#cdcde0",
        tabBarStyle: {
          backgroundColor: "#f1f1e8",
          borderTopWidth: 0,
          borderTopColor: "#f1f1e8",
          height: 90,
          paddingTop: 20,
        },
      }}
    >
      <Tabs.Screen
        name="expense"
        options={{
          title: "Expense",
          headerShown: false,
          tabBarIcon: ({ color }: { color: string }) => (
            <View className="items-center justify-center gap-2 w-full">
              <FontAwesome5 name="dollar-sign" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="analyze"
        options={{
          title: "Analyze",
          headerShown: false,
          tabBarIcon: ({ color }: { color: string }) => (
            <View className="items-center justify-center gap-2 w-full">
              <Ionicons name="stats-chart" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="subscriptions"
        options={{
          title: "Subscriptions",
          headerShown: false,
          tabBarIcon: ({ color }: { color: string }) => (
            <View className="items-center justify-center gap-2 w-full">
              <MaterialIcons name="subscriptions" size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout

import { View, Text } from "react-native"
import React from "react"
import { Tabs } from "expo-router"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#ffa001",
        tabBarInactiveTintColor: "#cdcde0",
        tabBarStyle: {
          backgroundColor: "#233337",
          borderTopWidth: 0,
          borderTopColor: "#233337",
          height: 70,
        },
      }}
    >
      <Tabs.Screen
        name="expense"
        options={{
          title: "Expense",
          headerShown: false,
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string
            focused: boolean
          }) => (
            <View className="items-center justify-center gap-2 w-full">
              <FontAwesome5 name="dollar-sign" size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout

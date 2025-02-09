import { View, Text } from "react-native"
import React from "react"
import { Tabs } from "expo-router"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"

const TabIcon = ({
  icon,
  color,
  name,
  focused,
}: {
  icon: any
  color: string
  name: string
  focused: boolean
}) => {
  return (
    <View className="items-center justify-center gap-2">
      {icon}
      <Text
        className={`${focused ? "font-semibold" : "font-regular"} text-xs`}
        style={{ color }}
      >
        {name}
      </Text>
    </View>
  )
}

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#ffa001",
        tabBarInactiveTintColor: "#cdcde0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 0,
          borderTopColor: "#232533",
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
            <TabIcon
              icon={<FontAwesome5 name="dollar-sign" size={24} color="black" />}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout

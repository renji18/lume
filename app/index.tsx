import {Image, Text} from "react-native"
import React from "react"
import Swipe from "@/components/Swipe"
import {SafeAreaView} from "react-native-safe-area-context"
import icon from "../assets/images/icon1.png"

const Welcome = () => {
  return (
    <SafeAreaView className="bg-blue h-screen justify-center items-center gap-20">
      <Image source={icon} className="w-[80vw] h-[80vw]"/>
      <Text className="text-soft_white text-4xl font-gsbi tracking-wide text-center px-5 leading-relaxed">
        Your Life, Your Flow, Your Lume.
      </Text>
      <Swipe/>
    </SafeAreaView>
  )
}

export default Welcome
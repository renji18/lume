import { Text, Image } from "react-native"
import React, { useEffect } from "react"
import { MyDispatch, MySelector } from "@/redux/store"
import { handleGetExpenseData } from "@/firebase"
import { useDispatch } from "react-redux"
import {
  setError,
  setExpenseData,
  setLoading,
} from "@/redux/slices/expenseTrackerSlice"
import Swipe from "@/components/Swipe"
import { SafeAreaView } from "react-native-safe-area-context"
import icon from "../assets/images/icon1.png"
import MyToast from "@/utils/MyToast"

const Welcome = () => {
  const dispatch = useDispatch<MyDispatch>()

  const { error } = MySelector((state) => state.expense)

  // effect to set the modules data
  useEffect(() => {
    const handleStoreData = async () => {
      dispatch(setLoading(true))
      const res = await handleGetExpenseData()
      if (res?.error) {
        dispatch(setError(res?.msg))
        dispatch(setLoading(false))
        return
      }
      dispatch(setExpenseData(res))
      dispatch(setLoading(false))
    }
    handleStoreData()
  }, [])

  // effect to show toast in case of error
  useEffect(() => {
    if (!error) return
    MyToast("error", error)
    dispatch(setError(null))
  }, [error])

  return (
    <SafeAreaView className="bg-black h-screen justify-center items-center gap-20">
      <Image source={icon} className="w-[80vw] h-[80vw]" />
      <Text className="text-theme-white text-4xl font-gsbi tracking-wide text-center px-5 leading-relaxed">
        Your Life, Your Flow, Your Lume.
      </Text>
      <Swipe />
    </SafeAreaView>
  )
}

export default Welcome

import { View, Text, TouchableOpacity } from "react-native"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { MySelector } from "@/redux/store"
import { ExpenseData } from "@/utils/interface"
import {
  getDateJs,
  uiDateFormatter,
  useDateFormatter,
} from "@/utils/dateFormatter"
import AddNewExpense from "@/components/AddNewExpense"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import AntDesign from "@expo/vector-icons/AntDesign"
import ExpenseList from "@/components/ExpenseList"
import { MyCalendar } from "@/components/Calendar"
import { useFocusEffect } from "@react-navigation/native"

const Expense = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  const dateToday = new Date(Date.now())

  const {
    data: { expenses },
  } = MySelector((state) => state.expense)

  const [currentDate, setCurrentDate] = useState<{ ui: string; use: string }>({
    ui: uiDateFormatter(dateToday),
    use: useDateFormatter(dateToday),
  })
  const [currentData, setCurrentData] = useState<Array<ExpenseData>>()
  const [showBars, setShowBars] = useState<boolean>(true)
  const [showCalendar, setShowCalendar] = useState<boolean>(false)

  // open bottom sheet to add new data
  const handleOpenBottomSheet = () => bottomSheetRef.current?.present()

  // handle swipe to update data
  const changeDate = (direction: -1 | 1) => {
    const newDate = getDateJs(currentDate.use)
    newDate.setDate(newDate.getDate() + direction)

    setCurrentDate({
      ui: uiDateFormatter(newDate),
      use: useDateFormatter(newDate),
    })
  }

  // to filter and set current date data
  useEffect(() => {
    if (!expenses) return
    if (!currentDate) return
    const filterCurrentData = expenses.filter((d) => d.date === currentDate.use)
    setCurrentData(filterCurrentData)
  }, [currentDate, expenses])

  // to hide the bars
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBars(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  // to reset showing calendar, navigate to current date
  useFocusEffect(
    useCallback(() => {
      setShowCalendar(false)
      setCurrentDate({
        ui: uiDateFormatter(dateToday),
        use: useDateFormatter(dateToday),
      })
    }, [])
  )

  return (
    <SafeAreaView className="bg-theme-white flex-1 w-full items-center relative">
      {!showCalendar && (
        <View className="relative">
          <TouchableOpacity
            className={`absolute top-0 bottom-0 w-28 justify-center items-center left-0 z-10 transition-all duration-500 ease-linear ${
              showBars ? "bg-theme-blue/70" : "bg-transparent"
            }`}
            onPress={() => changeDate(-1)}
          >
            {showBars && (
              <Text className="text-2xl text-theme-black font-gsb tracking-wider">
                Prev
              </Text>
            )}
          </TouchableOpacity>

          <ExpenseList
            currentDate={currentDate.ui}
            currentData={currentData}
            setShowCalendar={setShowCalendar}
          />

          <TouchableOpacity
            className={`absolute top-0 bottom-0 w-28 justify-center items-center right-0 z-10 transition-all duration-500 ease-linear ${
              showBars ? "bg-theme-blue/70" : "bg-transparent"
            }`}
            onPress={() => changeDate(1)}
          >
            {showBars && (
              <Text className="text-2xl text-theme-black font-gsb tracking-wider">
                Next
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {showCalendar && (
        <MyCalendar
          currentDate={currentDate.use}
          setCurrentDate={setCurrentDate}
          setShowCalendar={setShowCalendar}
        />
      )}

      <AddNewExpense ref={bottomSheetRef} currentDate={currentDate.use} />
      {!showCalendar && (
        <AntDesign
          onPress={handleOpenBottomSheet}
          name="pluscircle"
          size={50}
          color="#233337"
          className="absolute rounded-full bottom-5 right-5 z-20"
        />
      )}
    </SafeAreaView>
  )
}

export default Expense

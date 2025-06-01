import {Text, TouchableOpacity, View} from "react-native"
import React, {useCallback, useEffect, useRef, useState} from "react"
import {SafeAreaView} from "react-native-safe-area-context"
import AddNewExpense from "@/components/AddNewExpense"
import {BottomSheetModal} from "@gorhom/bottom-sheet"
import AntDesign from "@expo/vector-icons/AntDesign"
import ExpenseList from "@/components/ExpenseList"
import {MyCalendar} from "@/components/Calendar"
import {useFocusEffect} from "@react-navigation/native"

const Expense = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  // state to store the active date
  const [currentDate, setCurrentDate] = useState<Date>(new Date(Date.now()))

  const [showBars, setShowBars] = useState<boolean>(true)
  const [showCalendar, setShowCalendar] = useState<boolean>(false)

  // open bottom sheet to add new data
  const handleOpenBottomSheet = () => bottomSheetRef.current?.present()

  // handle swipe to update data
  const changeDate = (direction: -1 | 1) => {
    const newDate = new Date(currentDate);
    newDate.setUTCDate(newDate.getUTCDate() + direction);
    setCurrentDate(newDate)
  }

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
      setCurrentDate(new Date(Date.now()))
    }, [])
  )

  return (
    <SafeAreaView className="bg-beige flex-1 w-full items-center relative">
      {!showCalendar && (
        <View className="relative">
          <TouchableOpacity
            className={`absolute top-0 bottom-0 w-28 justify-center items-center left-0 z-10 transition-all duration-500 ease-linear ${
              showBars ? "bg-blue/70" : "bg-transparent"
            }`}
            onPress={() => changeDate(-1)}
          >
            {showBars && (
              <Text className="text-2xl text-dark_slate font-gsb tracking-wider">
                Prev
              </Text>
            )}
          </TouchableOpacity>

          {/*Main list*/}
          <ExpenseList
            currentDate={currentDate}
            setShowCalendar={setShowCalendar}
          />

          <TouchableOpacity
            className={`absolute top-0 bottom-0 w-28 justify-center items-center right-0 z-10 transition-all duration-500 ease-linear ${
              showBars ? "bg-blue/70" : "bg-transparent"
            }`}
            onPress={() => changeDate(1)}
          >
            {showBars && (
              <Text className="text-2xl text-dark_slate font-gsb tracking-wider">
                Next
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/*Calendar UI component*/}
      {showCalendar && (
        <MyCalendar
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          setShowCalendar={setShowCalendar}
        />
      )}

      {/*New expense bottom sheet UI component*/}
      <AddNewExpense ref={bottomSheetRef} currentDate={currentDate}/>

      {/*Add new expense UI button*/}
      {!showCalendar && (
        <AntDesign
          onPress={handleOpenBottomSheet}
          name="pluscircle"
          size={50}
          color="#2c2c2c"
          className="absolute rounded-full bottom-5 right-5 z-20"
        />
      )}
    </SafeAreaView>
  )
}

export default Expense
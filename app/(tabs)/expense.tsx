import {
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { MySelector } from "@/redux/store"
import { ExpenseData } from "@/utils/interface"
import { uiDateFormatter, useDateFormatter } from "@/utils/dateFormatter"
import AddNewExpense from "@/components/AddNewExpense"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import AntDesign from "@expo/vector-icons/AntDesign"
import ExpenseList from "@/components/ExpenseList"

const { width } = Dimensions.get("window")

const Expense = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const listRef = useRef<FlatList>(null)

  const dateToday = new Date(Date.now())

  const { data } = MySelector((state) => state.expense)

  const [currentDate, setCurrentDate] = useState<{ ui: string; use: string }>({
    ui: uiDateFormatter(dateToday),
    use: useDateFormatter(dateToday),
  })
  const [currentData, setCurrentData] = useState<Array<ExpenseData>>()
  const [today, setToday] = useState<string>(uiDateFormatter(dateToday))

  console.log(data, "d")
  console.log(currentDate, "c")
  console.log(dateToday, "d")

  // open bottom sheet to add new data
  const handleOpenBottomSheet = () => bottomSheetRef.current?.present()

  // const change date
  const changeDate = (direction: number) => {
    const [day, month, year] = currentDate.use.split("/").map(Number)
    const newDate = new Date(year, month - 1, day)
    newDate.setDate(newDate.getDate() + direction)

    setCurrentDate({
      ui: uiDateFormatter(newDate),
      use: useDateFormatter(newDate),
    })
  }

  // handle swipe to update data
  const handleSwipe = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x
    const index = Math.round(offsetX / width)
    if (index === 0) changeDate(-1)
    else if (index === 2) changeDate(1)
    listRef.current?.scrollToIndex({ index: 1, animated: false })
  }

  // effect to filter and set current date
  useEffect(() => {
    if (!data) return
    if (!currentDate) return
    const filterCurrentData = data.filter((d) => d.date === currentDate.use)
    setCurrentData(filterCurrentData)
    console.log(filterCurrentData, "filter")
  }, [currentDate, data])

  return (
    <SafeAreaView className="bg-theme-black flex-1 w-full items-center relative">
      <FlatList
        ref={listRef}
        horizontal
        pagingEnabled
        data={[{}, {}, {}]}
        extraData={currentDate}
        keyExtractor={(_, index) => index.toString()}
        onScrollEndDrag={handleSwipe}
        initialScrollIndex={1}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        contentContainerStyle={{ width: width * 3 }}
        showsHorizontalScrollIndicator={false}
        renderItem={() => (
          <ExpenseList
            currentDate={currentDate.ui}
            width={width}
            currentData={currentData}
          />
        )}
      />

      <AddNewExpense ref={bottomSheetRef} currentDate={currentDate.use} />
      <AntDesign
        onPress={handleOpenBottomSheet}
        name="pluscircle"
        size={50}
        color="#62b6c5"
        className="absolute rounded-full bottom-5 right-5"
      />
    </SafeAreaView>
  )
}

export default Expense

import { ActivityIndicator, Text, TouchableOpacity } from "react-native"
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet"
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group"
import { MyDispatch, MySelector } from "@/redux/store"
import { handleUpdateExpenseData } from "@/firebase"
import {
  setError,
  setLoading,
  updateExpenseData,
} from "@/redux/slices/expenseTrackerSlice"
import { useDispatch } from "react-redux"
import MyToast from "@/utils/MyToast"

interface Props {
  currentDate: string
}

type Ref = BottomSheetModal
const snapPoints = ["50%", "75%"]

const AddNewExpense = forwardRef<Ref, Props>(({ currentDate }, ref) => {
  const { dismiss } = useBottomSheetModal()

  const dispatch = useDispatch<MyDispatch>()
  const {
    data: { expenses },
    error,
    loading,
  } = MySelector((state) => state.expense)

  const reasonRef = useRef<string>("")
  const amountRef = useRef<number>(0)

  const [newEntry, setNewEntry] = useState<{
    amount: number
    mode: "online" | "cash"
    type: "+" | "-"
    reason: string
  }>({
    amount: 0,
    mode: "online",
    type: "+",
    reason: "",
  })

  const modeButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "online",
        label: "Online",
        value: "online",
        color: "#233337",
      },
      {
        id: "cash",
        label: "Cash",
        value: "cash",
        color: "#233337",
      },
    ],
    []
  )

  const typeButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "+",
        label: "Income",
        value: "+",
        color: "#233337",
      },
      {
        id: "-",
        label: "Expense",
        value: "-",
        color: "#233337",
      },
    ],
    []
  )

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  )

  // common fn to update state
  const handleNewData = (key: string, val: any) =>
    setNewEntry((prev) => ({ ...prev, [key]: val }))

  // fn to reset data
  const resetData = () => {
    setNewEntry({
      amount: 0,
      mode: "online",
      type: "+",
      reason: "",
    })
  }

  // fn to add new expense data
  const handleAdd = async () => {
    if (amountRef.current === 0) {
      dismiss()
      resetData()
      MyToast("error", "Please enter a valid amount")
      return
    }
    if (reasonRef.current === "") {
      dismiss()
      resetData()
      MyToast("error", "Please enter a valid reason")
      return
    }

    dispatch(setLoading(true))
    const newData = {
      ...newEntry,
      date: currentDate,
      reason: reasonRef.current,
      amount: amountRef.current,
    }
    const res = await handleUpdateExpenseData(expenses, newData)
    if (typeof res !== "string" && res?.error) {
      dispatch(setError(res?.msg))
    } else {
      typeof res === "string" && MyToast("success", res)
      dispatch(updateExpenseData(newData))
    }
    dispatch(setLoading(false))
    resetData()
    reasonRef.current = ""
    amountRef.current = 0
    dismiss()
  }

  // effect to show toast in case of error
  useEffect(() => {
    if (!error) return
    MyToast("error", error)
    dispatch(setError(null))
  }, [error])

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      animateOnMount
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: "#233337", marginTop: 10 }}
      backgroundStyle={{ backgroundColor: "#f1f1e8" }}
    >
      <BottomSheetView className="pt-8 bg-theme-white pb-60 flex-1 items-center gap-5">
        <Text className="font-gb text-4xl">Add New Expense</Text>
        <BottomSheetTextInput
          placeholder="Enter Amount"
          keyboardType="number-pad"
          defaultValue={String(newEntry?.amount || "")}
          onChangeText={(val) => (amountRef.current = Number(val))}
          className="border border-theme-black focus:border-theme-blue text-theme-black font-gl text-2xl px-5 py-2 rounded-full tracking-wide w-1/2 text-center"
        />
        <RadioGroup
          radioButtons={modeButtons}
          onPress={(val) => handleNewData("mode", val)}
          selectedId={newEntry.mode}
          layout="row"
          labelStyle={{
            fontSize: 16,
            color: "#233337",
          }}
        />
        <RadioGroup
          radioButtons={typeButtons}
          onPress={(val) => handleNewData("type", val)}
          selectedId={newEntry.type}
          layout="row"
          labelStyle={{
            fontSize: 16,
            color: "#233337",
          }}
        />
        <BottomSheetTextInput
          placeholder="Enter Reason"
          keyboardType="default"
          defaultValue={newEntry.reason}
          onChangeText={(val) => (reasonRef.current = val)}
          className="border border-theme-black focus:border-theme-blue text-theme-black font-gl text-2xl px-5 py-2 rounded-full tracking-wide w-2/3 text-center"
        />

        <TouchableOpacity
          onPress={handleAdd}
          className="bg-theme-blue w-1/2 px-5 py-2 rounded-full items-center"
        >
          {loading ? (
            <ActivityIndicator color="#0000ff" className="py-0.5" />
          ) : (
            <Text className="font-gsb text-xl tracking-wide">Add Data</Text>
          )}
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheetModal>
  )
})

export default AddNewExpense

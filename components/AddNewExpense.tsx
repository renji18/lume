import {ActivityIndicator, Text, TouchableOpacity} from "react-native"
import React, {forwardRef, useCallback, useMemo, useRef, useState,} from "react"
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet"
import RadioGroup, {RadioButtonProps} from "react-native-radio-buttons-group"
import MyToast from "@/utils/MyToast"
import {useTransactionStore} from "@/zustand/transaction-store";
import {useAuthStore} from "@/zustand/auth-store";
import {useAnalyticsStore} from "@/zustand/analytics-store";

interface Props {
  currentDate: Date
}

type Ref = BottomSheetModal
const snapPoints = ["50%", "75%"]

const AddNewExpense = forwardRef<Ref, Props>(({currentDate}, ref) => {
  const {dismiss} = useBottomSheetModal()
  const {user} = useAuthStore()
  const {createTransaction} = useTransactionStore()
  const {getYearlyOverview, getMonthlyOverview} = useAnalyticsStore()

  const loading = false

  const reasonRef = useRef<string>("")
  const amountRef = useRef<number>(0)

  const [newEntry, setNewEntry] = useState<{
    amount: number
    mode: "online" | "offline"
    type: "income" | "expense"
    reason: string
  }>({
    amount: 0,
    mode: "online",
    type: "income",
    reason: "",
  })

  const modeButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "online",
        label: "Online",
        value: "online",
        color: "#2c2c2c",
      },
      {
        id: "offline",
        label: "Cash",
        value: "offline",
        color: "#2c2c2c",
      },
    ],
    []
  )

  const typeButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "income",
        label: "Income",
        value: "income",
        color: "#2c2c2c",
      },
      {
        id: "expense",
        label: "Expense",
        value: "expense",
        color: "#2c2c2c",
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
    setNewEntry((prev) => ({...prev, [key]: val}))

  // fn to reset data
  const resetData = () => {
    setNewEntry({
      amount: 0,
      mode: "online",
      type: "income",
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

    const newData = {
      txn_date: currentDate.toISOString().split('T')[0],
      txn_reason: reasonRef.current,
      txn_amount: amountRef.current,
      txn_mode: newEntry.mode,
      txn_type: newEntry.type,
    }

    const res = await createTransaction(newData, user.id)

    if (res) {
      resetData()
      reasonRef.current = ""
      amountRef.current = 0

      getYearlyOverview(user.id)
      getMonthlyOverview(user.id)
    } else {
      MyToast("error", "Error creating transaction")
    }
    dismiss()

  }


  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      animateOnMount
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{backgroundColor: "#5a9bd5", marginTop: 10}}
      backgroundStyle={{backgroundColor: "#fafaf8"}}
    >
      <BottomSheetView className="pt-8 pb-60 flex-1 items-center gap-5">
        <Text className="font-gb text-4xl text-dark_slate">Add New Expense</Text>
        <BottomSheetTextInput
          placeholder="Enter Amount"
          keyboardType="decimal-pad"
          defaultValue={String(newEntry?.amount || "")}
          onChangeText={(val) => (amountRef.current = Number(val))}
          className="border border-dark_slate focus:border-blue text-dark_slate font-gl text-2xl px-5 py-2 rounded-full tracking-wide w-1/2 text-center placeholder:text-dark_slate/60"
        />
        <RadioGroup
          radioButtons={modeButtons}
          onPress={(val) => handleNewData("mode", val)}
          selectedId={newEntry.mode}
          layout="row"
          labelStyle={{
            fontSize: 16,
            color: "#2c2c2c",
          }}
        />
        <RadioGroup
          radioButtons={typeButtons}
          onPress={(val) => handleNewData("type", val)}
          selectedId={newEntry.type}
          layout="row"
          labelStyle={{
            fontSize: 16,
            color: "#2c2c2c",
          }}
        />
        <BottomSheetTextInput
          placeholder="Enter Reason"
          keyboardType="default"
          defaultValue={newEntry.reason}
          onChangeText={(val) => (reasonRef.current = val)}
          className="border border-dark_slate focus:border-blue text-dark_slate font-gl text-2xl px-5 py-2 rounded-full tracking-wide w-2/3 text-center placeholder:text-dark_slate/60"
        />

        <TouchableOpacity
          onPress={handleAdd}
          className="bg-blue w-1/2 px-5 py-2 rounded-full items-center"
        >
          {loading ? (
            <ActivityIndicator color="#fafaf8" className="py-0.5"/>
          ) : (
            <Text className="font-gsb text-xl text-soft_white tracking-wide">Add Data</Text>
          )}
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheetModal>
  )
})

export default AddNewExpense

import React, {useCallback, useState} from "react"
import {SafeAreaView} from "react-native-safe-area-context"
import {useFocusEffect} from "@react-navigation/native"
import MonthlyAnalysis from "@/components/MonthlyAnalysis"
import YearlyAnalysis from "@/components/YearlyAnalysis"

const Analyze = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  // to reset selected year
  useFocusEffect(
    useCallback(() => {
      setSelectedYear(null)
    }, [])
  )

  return (
    <SafeAreaView className="bg-beige flex-1 w-full items-center">
      {selectedYear ? (
        <MonthlyAnalysis
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      ) : (
        <YearlyAnalysis setSelectedYear={setSelectedYear}/>
      )}
    </SafeAreaView>
  )
}

export default Analyze

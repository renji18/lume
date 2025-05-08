
import React, {useCallback, useEffect, useState} from "react"
import {SafeAreaView} from "react-native-safe-area-context"
import {useFocusEffect} from "@react-navigation/native"
import MonthlyAnalysis from "@/components/MonthlyAnalysis"
import YearlyAnalysis from "@/components/YearlyAnalysis"

const Analyze = () => {

  const expenses: any[] = []

  const years = Object.values(
    expenses.reduce((acc, item) => {
      const [_, __, year] = item.date.split("/")
      const amount = Number(item.amount) * (item.type === "+" ? 1 : -1)

      if (!acc[year]) {
        acc[year] = {year, totalExpense: 0}
      }
      acc[year].totalExpense += amount
      return acc
    }, {} as Record<string, { year: string; totalExpense: number }>)
  )

  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [monthlyData, setMonthlyData] = useState<Array<{
    month: string
    aggregate: number
    totalIncome: number
    totalExpense: number
  }> | null>(null)

  // to extract monthly data
  useEffect(() => {
    if (!selectedYear) {
      setMonthlyData(null)
      return
    }
    const allMonthsData = expenses.filter((item) => {
      const [_, __, year] = item.date.split("/")
      if (year === selectedYear) return item
    })

    const months = Object.values(
      allMonthsData.reduce((acc, item) => {
        const [_, month, __] = item.date.split("/")
        const amount = Number(item.amount)
        const isIncome = item.type === "+"

        if (!acc[month]) {
          acc[month] = {month, aggregate: 0, totalExpense: 0, totalIncome: 0}
        }
        acc[month].aggregate += isIncome ? amount : -amount
        acc[month].totalIncome += isIncome ? amount : 0
        acc[month].totalExpense += isIncome ? 0 : amount
        return acc
      }, {} as Record<string, { month: string; aggregate: number; totalExpense: number; totalIncome: number }>)
    )

    // setMonthlyData(months)
  }, [selectedYear])

  // to reset selected year
  useFocusEffect(
    useCallback(() => {
      setSelectedYear(null)
    }, [])
  )

  return (
    <SafeAreaView className="bg-beige flex-1 w-full items-center">
      {/*{selectedYear ? (*/}
      {/*  <MonthlyAnalysis*/}
      {/*    selectedYear={selectedYear}*/}
      {/*    setSelectedYear={setSelectedYear}*/}
      {/*    monthlyData={monthlyData}*/}
      {/*  />*/}
      {/*) : (*/}
      {/*  <YearlyAnalysis years={years} setSelectedYear={setSelectedYear}/>*/}
      {/*)}*/}
    </SafeAreaView>
  )
}

export default Analyze

import {Calendar, toDateId} from "@marceloterreiro/flash-calendar"
import {View} from "react-native"
import {useMemo} from "react";

const today = toDateId(new Date())

export function MyCalendar({
                             currentDate,
                             setCurrentDate,
                             setShowCalendar,
                           }: {
  currentDate: Date
  setCurrentDate: (arg: Date) => void
  setShowCalendar: (arg: boolean) => void
}) {
  const selectedDate = useMemo(() => toDateId(currentDate), [currentDate])

  const activeDateRanges = useMemo(
    () => [
      {
        startId: selectedDate,
        endId: selectedDate,
      },
    ],
    [selectedDate]
  )

  const initialMonthId = useMemo(() => today, [])

  const changeDate = (dateId: string) => {
    if (dateId !== selectedDate) {
      setCurrentDate(new Date(dateId))
      setShowCalendar(false)
    }
  }

  return (
    <View className="flex-1 w-[80%] bg-blue rounded-lg px-3 mt-12">
      <Calendar.List
        calendarMonthHeaderHeight={30}
        calendarSpacing={60}
        calendarActiveDateRanges={activeDateRanges}
        calendarMinDateId="2025-06-01"
        calendarMaxDateId={today}
        calendarInitialMonthId={initialMonthId}
        onCalendarDayPress={changeDate}
      />
    </View>
  )
}

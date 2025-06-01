import { Calendar, toDateId } from "@marceloterreiro/flash-calendar"
import { View } from "react-native"

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
  const selectedDate = toDateId(currentDate)

  const changeDate = (e: any) => {
    setCurrentDate(new Date(e))
    setShowCalendar(false)
  }

  return (
    <View className="flex-1 w-[80%] bg-blue rounded-lg px-3 mt-12">
      <Calendar.List
        calendarMonthHeaderHeight={30}
        calendarSpacing={60}
        calendarActiveDateRanges={[
          {
            startId: selectedDate,
            endId: selectedDate,
          },
        ]}
        calendarMinDateId="2025-06-01"
        calendarMaxDateId={today}
        calendarInitialMonthId={today}
        onCalendarDayPress={changeDate}
      />
    </View>
  )
}

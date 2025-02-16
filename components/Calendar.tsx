import {
  getDateJs,
  uiDateFormatter,
  useDateFormatter,
} from "@/utils/dateFormatter"
import { Calendar, toDateId } from "@marceloterreiro/flash-calendar"
import { View } from "react-native"

const today = toDateId(new Date())

export function MyCalendar({
  currentDate,
  setCurrentDate,
  setShowCalendar,
}: {
  currentDate: string
  setCurrentDate: ({ ui, use }: { ui: string; use: string }) => void
  setShowCalendar: (arg: boolean) => void
}) {
  const selectedDate = toDateId(getDateJs(currentDate))

  const changeDate = (e: any) => {
    const newDate = new Date(e)

    setCurrentDate({
      ui: uiDateFormatter(newDate),
      use: useDateFormatter(newDate),
    })
    setShowCalendar(false)
  }

  return (
    <View className="flex-1 w-[80%] bg-theme-blue rounded-lg px-3 mt-12">
      <Calendar.List
        calendarMonthHeaderHeight={30}
        calendarSpacing={60}
        calendarActiveDateRanges={[
          {
            startId: selectedDate,
            endId: selectedDate,
          },
        ]}
        calendarMinDateId="2025-01-01"
        calendarMaxDateId={today}
        calendarInitialMonthId={today}
        onCalendarDayPress={changeDate}
      />
    </View>
  )
}

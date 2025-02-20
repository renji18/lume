export function getMonthShortName(month: string): string {
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  const index = parseInt(month, 10) - 1

  return months[index] || "Invalid Month"
}

export function getMonthName(month: string): string {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const index = parseInt(month, 10) - 1

  return months[index] || "Invalid Month"
}

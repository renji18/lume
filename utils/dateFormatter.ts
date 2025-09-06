// new Date("2025-02-28") → "28 Feb 2025"
export function uiDateFormatter(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

// "28/02/2025" → new Date(2025, 1, 28)
export function getDateJs(date: string) {
  const [day, month, year] = date.split("/").map(Number)
  return new Date(year, month - 1, day)
}

export function getDayOfWeek(dayNumber: number): string {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]

  if (dayNumber < 0 || dayNumber > 6) {
    throw new Error("Day number must be between 0 (Sunday) and 6 (Saturday).")
  }

  return days[dayNumber]
}

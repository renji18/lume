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

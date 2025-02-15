export function uiDateFormatter(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function useDateFormatter(date: Date) {
  return date.toLocaleDateString("en-GB")
}

// pass currentDate.use (dd/mm/yyyy)
export function getDateJs(date: string) {
  const [day, month, year] = date.split("/").map(Number)
  return new Date(year, month - 1, day)
}

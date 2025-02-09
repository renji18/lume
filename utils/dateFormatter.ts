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

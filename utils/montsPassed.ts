export function monthsSince(date: Date): number {
  const now = new Date()
  const yearsDiff = now.getFullYear() - date.getFullYear()
  const monthsDiff = now.getMonth() - date.getMonth()

  return yearsDiff * 12 + monthsDiff
}

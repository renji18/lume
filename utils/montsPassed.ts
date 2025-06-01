export function timeSince(date: Date, type: 'monthly' | 'yearly'): number {
  const now = new Date()
  const yearsDiff = now.getFullYear() - date.getFullYear()
  const monthsDiff = now.getMonth() - date.getMonth()
  const daysDiff = now.getDate() - date.getDate();

  if (type === "yearly") {
    let totalYears = yearsDiff;
    if (
      now.getMonth() < date.getMonth() ||
      (now.getMonth() === date.getMonth() && now.getDate() < date.getDate())
    ) {
      totalYears -= 1;
    }
    return totalYears + 1
  } else {
    let totalMonths = yearsDiff * 12 + monthsDiff
    if (now.getDate() < date.getDate()) {
      totalMonths -= 1;
    }
    return totalMonths + 1
  }

}

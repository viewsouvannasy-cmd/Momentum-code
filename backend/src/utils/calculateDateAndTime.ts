export function getEndDate(month: string, year: string): string {
  const nextMonth = Number(month) + 1;

  if (nextMonth > 12) {
    return `${Number(year) + 1}-${nextMonth - 12}-01`;
  }

  return `${year}-${nextMonth}-01`;
}

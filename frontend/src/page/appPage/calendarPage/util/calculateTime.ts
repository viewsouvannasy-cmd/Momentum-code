export interface SelectDateType {
  date: string;
  start_time: string;
  end_time: string;
  isEdit: boolean;
}

export function calculateSpendingTime(
  startTime: string,
  endTime: string,
): string {
  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);

  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  let diffMinutes = endMinutes - startMinutes;
  if (diffMinutes < 0) {
    diffMinutes += 24 * 60;
  }

  const h = Math.floor(diffMinutes / 60);
  const m = diffMinutes % 60;

  if (h === 0) {
    return `${m} m`;
  }

  if (m === 0) {
    return `${h} h`;
  }

  return `${h} h ${m} m`;
}

export function sortDateArray<T extends SelectDateType>(array: T[]): T[] {
  return [...array].sort((a, b) => getTimeUnix(a.date) - getTimeUnix(b.date));
}

export function getTimeUnix(date: string): number {
  return new Date(date).getTime();
}

export function setTimeAllDate(
  arrayDate: SelectDateType[],
  start_time_main: string,
  end_time_main: string,
) {
  return arrayDate.map((item) => {
    if (!item.isEdit) {
      return {
        date: item.date,
        start_time: start_time_main,
        end_time: end_time_main,
        isEdit: false,
      };
    }
    return item;
  });
}

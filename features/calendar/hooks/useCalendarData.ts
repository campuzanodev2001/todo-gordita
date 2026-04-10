import { Task } from "@/features/tasks/types";

export interface CalendarDay {
  date: string;
  dayNumber: number;
  tasks: Task[];
  isToday: boolean;
  isDeadline: boolean;
  isPast: boolean;
  isEmpty: boolean;
}

export interface CalendarMonth {
  label: string;
  year: number;
  month: number;
  startWeekday: number;
  days: (CalendarDay | null)[];
}

const TODAY = "2026-04-10";
const DEADLINE = "2026-05-10";

function formatDate(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function getStartWeekday(year: number, month: number): number {
  const day = new Date(year, month - 1, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function taskCoversDay(task: Task, dateString: string): boolean {
  if (!task.startDate && !task.endDate) return false;
  const start = task.startDate ?? dateString;
  const end = task.endDate ?? dateString;
  return dateString >= start && dateString <= end;
}

export function useCalendarData(tasks: Task[]): CalendarMonth[] {
  const months: CalendarMonth[] = [];

  const ranges = [
    { year: 2026, month: 4, label: "Abril 2026" },
    { year: 2026, month: 5, label: "Mayo 2026" },
  ];

  for (const { year, month, label } of ranges) {
    const totalDays = getDaysInMonth(year, month);
    const startWeekday = getStartWeekday(year, month);

    const days: (CalendarDay | null)[] = [];

    for (let pad = 0; pad < startWeekday; pad++) {
      days.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      const dateString = formatDate(year, month, day);

      if (dateString < TODAY || dateString > DEADLINE) {
        days.push({
          date: dateString,
          dayNumber: day,
          tasks: [],
          isToday: dateString === TODAY,
          isDeadline: dateString === DEADLINE,
          isPast: dateString < TODAY,
          isEmpty: true,
        });
        continue;
      }

      const dayTasks = tasks.filter((task) => taskCoversDay(task, dateString));

      days.push({
        date: dateString,
        dayNumber: day,
        tasks: dayTasks,
        isToday: dateString === TODAY,
        isDeadline: dateString === DEADLINE,
        isPast: false,
        isEmpty: dayTasks.length === 0,
      });
    }

    months.push({ label, year, month, startWeekday, days });
  }

  return months;
}

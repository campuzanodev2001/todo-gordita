"use client";

import { CalendarDay as CalendarDayType } from "../hooks/useCalendarData";

interface CalendarDayProps {
  day: CalendarDayType | null;
}

export function CalendarDayCell({ day }: CalendarDayProps) {
  if (day === null) {
    return <div />;
  }

  const baseClass =
    "relative flex flex-col items-center justify-start pt-1 h-11 rounded-lg overflow-hidden text-xs font-medium";

  const textColor = day.isPast
    ? "text-zinc-300"
    : day.isToday
    ? "text-white"
    : day.isDeadline
    ? "text-red-600"
    : "text-zinc-700";

  const bgColor = day.isToday
    ? "bg-zinc-900"
    : day.isDeadline
    ? "bg-red-50 ring-1 ring-red-300"
    : "";

  return (
    <div className={`${baseClass} ${bgColor}`}>
      <span className={textColor}>{day.dayNumber}</span>
      {day.tasks.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 flex gap-px h-1.5">
          {day.tasks.slice(0, 3).map((task) => (
            <div
              key={task.id}
              className="flex-1 h-full"
              style={{ backgroundColor: task.color }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { Task } from "@/features/tasks/types";
import { useCalendarData } from "../hooks/useCalendarData";
import { CalendarDayCell } from "./CalendarDay";

const WEEKDAY_LABELS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

interface CalendarProps {
  tasks: Task[];
}

export function Calendar({ tasks }: CalendarProps) {
  const months = useCalendarData(tasks);

  return (
    <div className="px-4 pt-4 pb-2 flex flex-col gap-5">
      {months.map((month) => (
        <div key={`${month.year}-${month.month}`}>
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">
            {month.label}
          </p>

          <div className="grid grid-cols-7 gap-0.5 mb-0.5">
            {WEEKDAY_LABELS.map((label) => (
              <div
                key={label}
                className="text-center text-xs text-zinc-400 font-medium py-1"
              >
                {label}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5">
            {month.days.map((day, index) => (
              <CalendarDayCell key={day ? day.date : `pad-${index}`} day={day} />
            ))}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-4 pt-1 pb-1">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-zinc-900" />
          <span className="text-xs text-zinc-500">Hoy</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-100 ring-1 ring-red-300" />
          <span className="text-xs text-zinc-500">Límite (10 may)</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Task, TaskStatus } from "../types";

const STATUS_CYCLE: Record<TaskStatus, TaskStatus> = {
  todo: "in-progress",
  "in-progress": "done",
  done: "todo",
};

const STATUS_ICONS: Record<TaskStatus, string> = {
  todo: "○",
  "in-progress": "◑",
  done: "●",
};

const URGENCY_LABELS: Record<string, string> = {
  low: "baja",
  medium: "media",
  high: "alta",
};

const URGENCY_COLORS: Record<string, string> = {
  low: "text-emerald-600 bg-emerald-50",
  medium: "text-amber-600 bg-amber-50",
  high: "text-red-600 bg-red-50",
};

function formatDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("es-AR", { day: "numeric", month: "short" });
}

interface TaskCardProps {
  task: Task;
  onStatusChange: (nextStatus: TaskStatus) => void;
  onEdit: () => void;
}

export function TaskCard({ task, onStatusChange, onEdit }: TaskCardProps) {
  function handleStatusClick(event: React.MouseEvent) {
    event.stopPropagation();
    onStatusChange(STATUS_CYCLE[task.status]);
  }

  const isDone = task.status === "done";

  return (
    <div
      onClick={onEdit}
      className="flex items-start gap-3 px-4 py-3.5 bg-white rounded-xl border border-zinc-100 cursor-pointer hover:border-zinc-200 transition-colors"
    >
      <button
        type="button"
        onClick={handleStatusClick}
        className="mt-0.5 text-lg leading-none flex-shrink-0 transition-opacity hover:opacity-70"
        style={{ color: task.color }}
      >
        {STATUS_ICONS[task.status]}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium leading-snug ${
            isDone ? "line-through text-zinc-400" : "text-zinc-900"
          }`}
        >
          {task.title}
        </p>

        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {(task.startDate || task.endDate) && (
            <span className="text-xs text-zinc-400">
              {task.startDate && formatDate(task.startDate)}
              {task.startDate && task.endDate && " → "}
              {task.endDate && formatDate(task.endDate)}
            </span>
          )}
          {task.location && (
            <span className="text-xs text-zinc-400">· {task.location}</span>
          )}
          {task.urgency && (
            <span
              className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${URGENCY_COLORS[task.urgency]}`}
            >
              {URGENCY_LABELS[task.urgency]}
            </span>
          )}
        </div>

        {task.notes && (
          <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{task.notes}</p>
        )}
      </div>

      <div
        className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5"
        style={{ backgroundColor: task.color }}
      />
    </div>
  );
}

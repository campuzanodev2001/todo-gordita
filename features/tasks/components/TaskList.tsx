"use client";

import { useState } from "react";
import { Task, TaskStatus } from "../types";
import { TaskCard } from "./TaskCard";

type FilterTab = "all" | TaskStatus;

const TABS: { value: FilterTab; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "todo", label: "Por hacer" },
  { value: "in-progress", label: "En curso" },
  { value: "done", label: "Listo" },
];

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onStatusChange: (task: Task, nextStatus: TaskStatus) => void;
}

export function TaskList({
  tasks,
  loading,
  onAddTask,
  onEditTask,
  onStatusChange,
}: TaskListProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filteredTasks =
    activeTab === "all"
      ? tasks
      : tasks.filter((task) => task.status === activeTab);

  return (
    <>
      <div className="px-4 border-b border-zinc-100 flex gap-1 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={`py-3 px-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.value
                ? "border-zinc-900 text-zinc-900"
                : "border-transparent text-zinc-400 hover:text-zinc-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="px-4 py-4">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-sm text-zinc-400">Cargando...</div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <p className="text-sm text-zinc-400">
              {activeTab === "all"
                ? "No hay tareas todavía"
                : "No hay tareas en esta categoría"}
            </p>
            {activeTab === "all" && (
              <button
                type="button"
                onClick={onAddTask}
                className="text-sm text-zinc-900 font-medium underline underline-offset-2"
              >
                Agregar la primera
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={(nextStatus) => onStatusChange(task, nextStatus)}
                onEdit={() => onEditTask(task)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

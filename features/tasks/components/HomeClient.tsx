"use client";

import { useState } from "react";
import { Task, TaskStatus } from "../types";
import { useTasks } from "../hooks/useTasks";
import { TaskList } from "./TaskList";
import { TaskForm } from "./TaskForm";
import { Calendar } from "@/features/calendar/components/Calendar";
import { TutorialModal } from "@/features/tutorial/components/TutorialModal";

export function HomeClient() {
  const { tasks, loading, addTask, updateTask, deleteTask } = useTasks();
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  function openNewTaskForm() {
    setEditingTask(undefined);
    setFormOpen(true);
  }

  function openEditTaskForm(task: Task) {
    setEditingTask(task);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingTask(undefined);
  }

  async function handleFormSubmit(data: Parameters<typeof addTask>[0]) {
    if (editingTask) {
      await updateTask(editingTask.id, data);
    } else {
      await addTask(data);
    }
  }

  async function handleDelete() {
    if (editingTask) {
      await deleteTask(editingTask.id);
    }
  }

  async function handleStatusChange(task: Task, nextStatus: TaskStatus) {
    await updateTask(task.id, { status: nextStatus });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-4 py-4 border-b border-zinc-100">
        <h1 className="text-base font-semibold text-zinc-900 tracking-tight">
          Todo Gordita
        </h1>
        <button
          type="button"
          onClick={openNewTaskForm}
          className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-lg leading-none hover:bg-zinc-700 transition-colors"
        >
          +
        </button>
      </header>

      <div className="border-b border-zinc-100">
        <Calendar tasks={tasks} />
      </div>

      <TaskList
        tasks={tasks}
        loading={loading}
        onAddTask={openNewTaskForm}
        onEditTask={openEditTaskForm}
        onStatusChange={handleStatusChange}
      />

      <TutorialModal />

      {formOpen && (
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onDelete={editingTask ? handleDelete : undefined}
          onClose={closeForm}
        />
      )}
    </div>
  );
}

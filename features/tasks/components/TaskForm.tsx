"use client";

import { useState, useEffect } from "react";
import { Task, TaskFormData, TaskStatus, UrgencyLevel } from "../types";
import { ColorPicker } from "./ColorPicker";

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: TaskFormData) => Promise<void>;
  onDelete?: () => Promise<void>;
  onClose: () => void;
}

const EMPTY_FORM: TaskFormData = {
  title: "",
  status: "todo",
  color: "#22c55e",
  notes: "",
  startDate: "",
  endDate: "",
  location: "",
  urgency: "",
};

export function TaskForm({ task, onSubmit, onDelete, onClose }: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        status: task.status,
        color: task.color,
        notes: task.notes ?? "",
        startDate: task.startDate ?? "",
        endDate: task.endDate ?? "",
        location: task.location ?? "",
        urgency: task.urgency ?? "",
      });
    } else {
      setFormData(EMPTY_FORM);
    }
  }, [task]);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!formData.title.trim()) return;
    setSaving(true);
    await onSubmit(formData);
    setSaving(false);
    onClose();
  }

  async function handleDelete() {
    if (!onDelete) return;
    setDeleting(true);
    await onDelete();
    setDeleting(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-white rounded-t-2xl shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-zinc-100">
          <h2 className="text-base font-semibold text-zinc-900">
            {task ? "Editar tarea" : "Nueva tarea"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto flex-1 px-5 py-4 flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
              Título *
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="¿Qué hay que hacer?"
              required
              className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                Estado
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300 bg-white"
              >
                <option value="todo">Por hacer</option>
                <option value="in-progress">En curso</option>
                <option value="done">Terminado</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                Urgencia
              </label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300 bg-white"
              >
                <option value="">Sin definir</option>
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
              Color en calendario
            </label>
            <ColorPicker
              value={formData.color}
              onChange={(color) =>
                setFormData((previous) => ({ ...previous, color }))
              }
            />
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                Fecha inicio
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                min="2026-04-10"
                max="2026-05-10"
                className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300"
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                Fecha fin
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                min="2026-04-10"
                max="2026-05-10"
                className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-300"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
              Lugar
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="ej. Buenos Aires"
              className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
              Notas
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Detalles adicionales..."
              rows={3}
              className="w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-1 pb-2">
            {task && onDelete && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 border border-red-200 text-red-500 rounded-xl py-3 text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                {deleting ? "Eliminando..." : "Eliminar"}
              </button>
            )}
            <button
              type="submit"
              disabled={saving || !formData.title.trim()}
              className="flex-1 bg-zinc-900 text-white rounded-xl py-3 text-sm font-medium hover:bg-zinc-700 transition-colors disabled:opacity-40"
            >
              {saving ? "Guardando..." : task ? "Guardar cambios" : "Agregar tarea"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

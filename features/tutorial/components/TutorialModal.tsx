"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "todo-gordita-tutorial-seen";

const STEPS = [
  {
    emoji: "👋",
    title: "Bienvenida a Todo Gordita",
    description:
      "Tu app para organizar todo lo que hay que hacer antes del 10 de mayo. Te mostramos cómo usarla en 4 pasos.",
  },
  {
    emoji: "➕",
    title: "Agregá una tarea",
    description:
      'Tocá el botón + arriba a la derecha para crear una tarea nueva. Podés ponerle título, fechas, lugar, urgencia y notas. Lo único obligatorio es el título.',
    tip: "Ejemplo: \"Sacar el pasaporte\" con fecha límite 5 de mayo.",
  },
  {
    emoji: "🎨",
    title: "Elegí un color",
    description:
      "Cada tarea tiene un color que vas a ver reflejado en el calendario. Así podés identificar de un vistazo qué días pasan qué cosas.",
    tip: "Si la tarea dura varios días (como un viaje), poné fecha de inicio y fecha de fin — se pintan todos esos días.",
  },
  {
    emoji: "📅",
    title: "El calendario",
    description:
      "El calendario muestra desde hoy hasta el 10 de mayo. Los días se colorean según las tareas que tenés activas en ese rango.",
    tip: "El día de hoy tiene fondo negro. El 10 de mayo tiene borde rojo — ese es el límite.",
  },
  {
    emoji: "✅",
    title: "Cambiá el estado",
    description:
      "Tocá el círculo a la izquierda de cada tarea para avanzar su estado: Por hacer → En curso → Listo.",
    tip: "Tocá sobre el texto de la tarea para editarla o eliminarla.",
  },
];

export function TutorialModal() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      setVisible(true);
    }
  }, []);

  function handleNext() {
    if (step < STEPS.length - 1) {
      setStep((previous) => previous + 1);
    } else {
      handleClose();
    }
  }

  function handlePrevious() {
    setStep((previous) => previous - 1);
  }

  function handleClose() {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  }

  if (!visible) return null;

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      <div className="relative w-full max-w-lg bg-white rounded-t-2xl shadow-xl px-6 pt-8 pb-8 flex flex-col gap-6">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-5 text-zinc-300 hover:text-zinc-500 text-xl leading-none"
        >
          ✕
        </button>

        <div className="flex flex-col items-center text-center gap-3">
          <div className="text-5xl leading-none">{current.emoji}</div>
          <h2 className="text-lg font-semibold text-zinc-900">{current.title}</h2>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
            {current.description}
          </p>
          {current.tip && (
            <div className="bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 w-full text-left">
              <p className="text-xs text-zinc-400 leading-relaxed">
                <span className="font-medium text-zinc-500">Tip: </span>
                {current.tip}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-1.5">
          {STEPS.map((_, index) => (
            <div
              key={index}
              className={`rounded-full transition-all duration-200 ${
                index === step
                  ? "w-5 h-1.5 bg-zinc-900"
                  : "w-1.5 h-1.5 bg-zinc-200"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3">
          {!isFirst && (
            <button
              type="button"
              onClick={handlePrevious}
              className="flex-1 border border-zinc-200 text-zinc-600 rounded-xl py-3 text-sm font-medium hover:bg-zinc-50 transition-colors"
            >
              Atrás
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 bg-zinc-900 text-white rounded-xl py-3 text-sm font-medium hover:bg-zinc-700 transition-colors"
          >
            {isLast ? "Empezar" : "Siguiente"}
          </button>
        </div>
      </div>
    </div>
  );
}

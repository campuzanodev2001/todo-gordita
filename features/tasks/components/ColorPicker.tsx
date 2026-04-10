"use client";

const PRESET_COLORS = [
  "#22c55e",
  "#3b82f6",
  "#ef4444",
  "#f97316",
  "#a855f7",
  "#ec4899",
  "#eab308",
  "#14b8a6",
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {PRESET_COLORS.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          className="w-8 h-8 rounded-full transition-transform"
          style={{
            backgroundColor: color,
            outline: value === color ? `3px solid ${color}` : "none",
            outlineOffset: "2px",
            transform: value === color ? "scale(1.15)" : "scale(1)",
          }}
        />
      ))}
    </div>
  );
}

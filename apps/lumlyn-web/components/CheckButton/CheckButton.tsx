import { useState } from "react";

export default function CheckButton() {
  const [checked, setChecked] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setChecked(!checked)}
      className={`w-12 h-12 rounded-lg border-2 ${
        checked ? "bg-blue-500 border-blue-600 text-white" : "bg-white border-gray-400"
      }`}
    >
      {checked ? "✓" : ""}
    </button>
  );
}

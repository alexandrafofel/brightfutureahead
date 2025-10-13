"use client";

/**
 * A multi‑line textarea with an associated label and error message.
 *
 * Similar to `TextField`, this component receives the registration object from
 * `react-hook-form` and spreads it onto the `<textarea>` element.
 */

export type RegisteredTextarea = {
  name: string;
  onBlur: (e: React.FocusEvent<any>) => void;
  onChange: (e: React.ChangeEvent<any>) => void;
  ref: (instance: HTMLTextAreaElement | null) => void;
};

interface TextareaProps {
  label: string;
  placeholder: string;
  register: RegisteredTextarea;
  error?: string;
}

export function Textarea({ label, placeholder, register, error }: TextareaProps) {
  const { name, onBlur, onChange, ref } = register;
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        rows={5}
        aria-invalid={error ? true : false}
        aria-describedby={error ? `${name}-error` : undefined}
        onBlur={onBlur}
        onChange={onChange}
        ref={ref}
        className="w-full border border-[#3B20FF] rounded-md px-3 py-2 text-[16px] font-semibold placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-[#6FAAF7]"
      ></textarea>
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

"use client";

import { forwardRef } from "react";

/**
 * A reusable text input control with an associated label and error message.
 *
 * It expects to receive the result of `react-hook-form`’s `register` call
 * as the `register` prop.  This object contains the `name`, `onBlur`,
 * `onChange` and `ref` properties which are spread onto the underlying
 * `<input>` element.  See `ContactForm` for usage examples.
 */
export type RegisteredField = {
  name: string;
  onBlur: (e: React.FocusEvent<any>) => void;
  onChange: (e: React.ChangeEvent<any>) => void;
  ref: (instance: HTMLInputElement | null) => void;
};

interface TextFieldProps {
  /** Descriptive label for screen readers. */
  label: string;
  /** Placeholder text shown when the input is empty. */
  placeholder: string;
  /** Object returned from `register()` containing refs and event handlers. */
  register: RegisteredField;
  /** Optional validation error associated with this field. */
  error?: string;
  /** Input type, defaults to `text`. */
  type?: string;
}

export function TextField({ label, placeholder, register, error, type = "text" }: TextFieldProps) {
  const { name, onBlur, onChange, ref } = register;
  return (
    <div className="flex flex-col flex-1">
      {/* Use a visually hidden label to provide an accessible name without
          displaying text on the screen. */}
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={error ? true : false}
        aria-describedby={error ? `${name}-error` : undefined}
        onBlur={onBlur}
        onChange={onChange}
        ref={ref}
        className="w-full border border-[#3B20FF] rounded-md px-3 py-2 text-[16px] font-semibold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6FAAF7]"
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

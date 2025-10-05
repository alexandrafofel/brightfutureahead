"use client";

import * as React from "react";

/**
 * A simple checkbox control used for the consent agreement.
 *
 * The registration object from `react-hook-form` is spread onto the
 * `<input>` element.  Consumers are responsible for rendering an
 * associated label.
 */
export type RegisteredCheckbox = {
  name: string;
  onBlur: (e: React.FocusEvent<any>) => void;
  onChange: (e: React.ChangeEvent<any>) => void;
  ref: (instance: HTMLInputElement | null) => void;
};

interface CheckboxProps {
  /** The id to use on the input.  Must match the label htmlFor. */
  id: string;
  register: RegisteredCheckbox;
  className?: string;
}

export function Checkbox({ id, register }: CheckboxProps) {
  const { name, onBlur, onChange, ref } = register;
  return (
    <input
      id={id}
      name={name}
      type="checkbox"
      onBlur={onBlur}
      onChange={onChange}
      ref={ref}
      className="h-[20px] w-[20px] shrink-0 rounded-[4px] border border-[#999] text-[#6FAAF7]"
    />
  );
}

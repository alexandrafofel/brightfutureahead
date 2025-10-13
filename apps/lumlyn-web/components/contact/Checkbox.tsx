"use client";

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
      className="h-5 w-5 shrink-0 rounded-[4px] border border-gray-400 text-[#6FAAF7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6FAAF7]"
    />
  );
}

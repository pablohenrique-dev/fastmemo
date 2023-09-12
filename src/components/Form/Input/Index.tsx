import React from "react";
import { UseFormRegister } from "react-hook-form";

type InputProps = React.ComponentProps<"input"> & {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors: string | undefined;
};

export const Input = ({
  label,
  name,
  register,
  errors,
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col mb-4">
      <label
        className="mb-1 inline-block capitalize text-lg font-semibold"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        className="p-3 border border-slate-default rounded-md"
        type="text"
        id={label}
        {...register(name)}
        {...props}
      />
      {errors && <span className="fade-right text-red-600 mt-2">{errors}</span>}
    </div>
  );
};

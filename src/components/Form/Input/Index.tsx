import React from "react";

type InputProps = React.ComponentProps<"input"> & {
  label: string;
};

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <div className="flex flex-col mb-6">
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
        {...props}
      />
    </div>
  );
};

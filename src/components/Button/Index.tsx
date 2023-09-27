import React from "react";

type ButtonProps = React.ComponentProps<"button">;

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className="w-full text-white bg-black rounded-md py-3 hover:bg-neutral-800"
      {...props}
    >
      {children}
    </button>
  );
};

import React from "react";

export const Button = ({ children }: React.PropsWithChildren) => {
  return (
    <button className="w-full text-white bg-black rounded-md py-3">
      {children}
    </button>
  );
};

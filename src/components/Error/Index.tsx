import React from "react";

export const ErrorComponent = ({ children }: React.PropsWithChildren) => {
  return (
    <span className="fade-right w-[400px] text-center rounded mt-4 py-3 bg-red-300 border-l-8 border-l-red-500">
      {children}
    </span>
  );
};

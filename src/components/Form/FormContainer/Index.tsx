import React from "react";

type FormContainerProps = React.ComponentProps<"form"> & {
  title: string;
};

export const FormContainer = ({ children, title }: FormContainerProps) => {
  return (
    <form className="p-6 border border-slate-400 flex flex-col rounded-lg w-[380px]">
      <h1 className="font-bold text-2xl mb-4 mx-auto capitalize">{title}</h1>
      {children}
    </form>
  );
};

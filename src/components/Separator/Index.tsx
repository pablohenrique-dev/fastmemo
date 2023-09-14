import React from "react";

interface SeparatorProps {
  orientation: "vertical" | "horizontal";
}

export const Separator = ({ orientation }: SeparatorProps) => {
  return (
    <span
      className={
        orientation === "horizontal"
          ? "h-[0.5px] w-full bg-slate-400 my-4"
          : "w-[0.5px] h-[24px] bg-slate-400"
      }
    ></span>
  );
};

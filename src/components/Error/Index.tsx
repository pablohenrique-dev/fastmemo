import React from "react";

type AlertComponentProps = React.PropsWithChildren<{
  status: "error" | "success";
}>;

export const AlertComponent = ({ children, status }: AlertComponentProps) => {
  const basesStyle =
    "block fade-right w-[400px] text-center rounded mt-4 py-3 border-l-8";

  const statusStyle =
    status === "error"
      ? "bg-red-300 border-l-red-500"
      : "bg-green-300 border-l-green-500";

  const combinedStyles = `${basesStyle} ${statusStyle}`;

  return <span className={combinedStyles}>{children}</span>;
};

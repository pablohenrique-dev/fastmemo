import React from "react";
import { NavLink } from "react-router-dom";

type NavLinkProps = React.PropsWithChildren<{
  to: string;
  end?: boolean;
}>;

export const NavLinkComponent = ({
  children,
  to,
  end = false,
}: NavLinkProps) => {
  return (
    <NavLink
      className="whitespace-nowrap flex gap-2 items-center border border-black md:border-none px-4 py-2 mb-2 rounded text-base md:text-lg"
      to={to}
      end={end}
    >
      {children}
    </NavLink>
  );
};

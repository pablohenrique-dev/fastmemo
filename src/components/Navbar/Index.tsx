import React from "react";
import { NavLink, Link } from "react-router-dom";
import { House, ChartPie, SignOut } from "@phosphor-icons/react";

export const Navbar = () => {
  return (
    <nav className="p-6 flex flex-col justify-between h-screen border-r border-slate-default sticky top-0 left-0">
      <div className="fade-right">
        <Link className="text-xl font-bold mb-8 inline-block" to="/">
          FASTMEMO
        </Link>
        <NavLink to="/" className="nav-link">
          <House size={24} color="#656D76" />
          Início
        </NavLink>
        <NavLink to="/estatisticas" className="nav-link">
          <ChartPie size={24} color="#656D76" />
          Estatísticas
        </NavLink>
      </div>
      <button className="nav-link fade-right">
        <SignOut size={24} color="#656D76" />
        Sair
      </button>
    </nav>
  );
};

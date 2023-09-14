import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  House,
  ChartPie,
  SignOut,
  UserCircleGear,
} from "@phosphor-icons/react";
import { useAuthContext } from "../../contexts/AuthContext";

export const Navbar = () => {
  const { logout } = useAuthContext();
  return (
    <nav className="p-6 flex flex-col justify-between h-screen border-r border-slate-default sticky top-0 left-0">
      <div className="flex flex-col fade-right">
        <Link className="text-xl font-bold mb-8 inline-block" to="/">
          FASTMEMO
        </Link>
        <NavLink to="/" className="nav-link">
          <House size={24} />
          Início
        </NavLink>
        <NavLink to="/estatisticas" className="nav-link">
          <ChartPie size={24} />
          Estatísticas
        </NavLink>
      </div>
      <div>
        <NavLink to="/minha-conta" className="nav-link">
          <UserCircleGear size={26} />
          Minha conta
        </NavLink>
        <button onClick={logout} className="nav-link fade-right">
          <SignOut size={24} />
          Sair
        </button>
      </div>
    </nav>
  );
};

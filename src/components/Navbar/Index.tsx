import { Link } from "react-router-dom";
import {
  House,
  ChartPie,
  SignOut,
  UserCircleGear,
} from "@phosphor-icons/react";
import { useAuthContext } from "../../contexts/AuthContext";
import { NavLinkComponent } from "../NavLink/Index";

export const Navbar = () => {
  const { logout } = useAuthContext();
  return (
    <nav className="p-6 flex flex-col justify-between h-screen border-r border-slate-default sticky top-0 left-0">
      <div className="flex flex-col fade-right">
        <Link className="text-xl font-bold mb-8 inline-block" to="/">
          FASTMEMO
        </Link>
        <NavLinkComponent to="/">
          <House size={24} />
          Início
        </NavLinkComponent>
        <NavLinkComponent to="/estatisticas?q=asdasd">
          <ChartPie size={24} />
          Estatísticas
        </NavLinkComponent>
      </div>
      <div>
        <NavLinkComponent to="/minha-conta">
          <UserCircleGear size={26} />
          Minha conta
        </NavLinkComponent>
        <button onClick={logout} className="nav-link fade-right">
          <SignOut size={24} />
          Sair
        </button>
      </div>
    </nav>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import {
  House,
  ChartPie,
  SignOut,
  UserCircleGear,
  Lightbulb,
} from "@phosphor-icons/react";
import { useAuthContext } from "../../contexts/AuthContext";
import { NavLinkComponent } from "../NavLink/Index";
import CloseIcon from "/close-icon.svg";

interface NavBarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar = ({ isOpen, setIsOpen }: NavBarProps) => {
  const { logout } = useAuthContext();

  function logoutUser() {
    const confirmLogOut = confirm("Deseja mesmo sair da conta?");
    if (confirmLogOut) {
      logout();
    }
  }
  return (
    <nav
      className={`fixed w-full z-50 bg-white px-6 py-4 md:p-6 flex flex-col justify-between h-screen md:border-r border-slate-default md:sticky top-0 ${
        isOpen ? "left-0" : "-left-full"
      }`}
    >
      <div className="flex flex-col fade-right">
        <div className="flex justify-between items-center mb-8">
          <Link className="text-xl font-bold inline-block" to="/">
            <button className="w-full" onClick={() => setIsOpen(false)}>
              FASTMEMO
            </button>
          </Link>
          <button onClick={() => setIsOpen(false)} className="block md:hidden">
            <img src={CloseIcon} alt="Botão fechar" width={30} />
          </button>
        </div>
        <NavLinkComponent to="/">
          <button
            className="flex gap-2 items-center w-full"
            onClick={() => setIsOpen(false)}
          >
            <House size={24} />
            Início
          </button>
        </NavLinkComponent>
        <NavLinkComponent to="/estatisticas">
          <button
            className="flex gap-2 items-center w-full"
            onClick={() => setIsOpen(false)}
          >
            <ChartPie size={24} />
            Estatísticas
          </button>
        </NavLinkComponent>
        <NavLinkComponent to="/sobre">
          <button
            className="flex gap-2 items-center w-full"
            onClick={() => setIsOpen(false)}
          >
            <Lightbulb size={24} />
            Sobre
          </button>
        </NavLinkComponent>
      </div>
      <div>
        <NavLinkComponent to="/minha-conta">
          <button
            className="flex gap-2 items-center w-full"
            onClick={() => setIsOpen(false)}
          >
            <UserCircleGear size={26} />
            Minha conta
          </button>
        </NavLinkComponent>
        <button
          onClick={logoutUser}
          className="nav-link fade-right border border-black md:border-none px-4"
        >
          <SignOut size={24} />
          Sair
        </button>
      </div>
    </nav>
  );
};

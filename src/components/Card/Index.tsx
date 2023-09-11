import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  link: string;
}

export const Card = ({ link }: CardProps) => {
  return (
    <Link
      to={`/cards/${link}`}
      className="relative flex flex-col rounded-md overflow-hidden border border-slate-default"
    >
      <span className="text-black bg-white px-2 py-[2px] font-semibold text-sm absolute top-4 right-4 rounded-sm">
        Novo
      </span>
      <div className="flex justify-center items-center w-full bg-black text-white font-bold italic text-3xl py-12">
        Inglês
      </div>
      <div className="p-4">
        <h2 className="text-black text-2xl font-bold mb-2 h-fit">Inglês</h2>
        <span className="text-slate-700 text-xs">30/08/2023</span>
      </div>
    </Link>
  );
};

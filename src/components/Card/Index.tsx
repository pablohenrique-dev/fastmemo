import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/handleDate";

interface CardProps {
  infoCard: string;
  title: string;
  created_at: string;
}

export const Card = ({ infoCard, title, created_at }: CardProps) => {
  return (
    <Link
      to={`/decks/${infoCard}`}
      className="relative flex flex-col rounded-md overflow-hidden border border-slate-default"
    >
      <span className="text-black bg-white px-2 py-[2px] font-semibold text-sm absolute top-4 right-4 rounded-sm">
        Novo
      </span>
      <div className="flex justify-center items-center w-full bg-black text-center text-white font-bold italic text-3xl py-12">
        {title}
      </div>
      <div className="p-4">
        <h2 className="text-black text-2xl font-bold mb-2 h-fit">{title}</h2>
        <span className="text-slate-700 text-xs">{formatDate(created_at)}</span>
      </div>
    </Link>
  );
};

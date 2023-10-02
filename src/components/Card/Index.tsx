import React from "react";
import { Link } from "react-router-dom";
import { formatDate, simplifyReturnedDate } from "../../utils/handleDate";
import { Trash } from "@phosphor-icons/react";
import { decodeSpecialString } from "../../utils/handleString";

interface CardProps {
  infoCard: string;
  title: string;
  created_at: string;
  deleteDeck: (idDeck: number) => void;
}

export const Card = ({
  infoCard,
  title,
  created_at,
  deleteDeck,
}: CardProps) => {
  function deleteASpecificDeck(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const [idDeck, nameDeck] = infoCard.split("@");

    const confirmDelete = confirm(
      `Tem certeza que deseja deletar o deck ${decodeSpecialString(
        nameDeck
      )}? Após exclusão não será possível recuperar o deck`
    );
    if (confirmDelete) {
      deleteDeck(Number(idDeck));
    }
  }

  return (
    <Link
      to={`/cards/${infoCard}`}
      className="relative flex flex-col rounded-md overflow-hidden border border-slate-default  hover:border-black transition"
    >
      {simplifyReturnedDate(new Date().toISOString()) -
        simplifyReturnedDate(created_at) <=
        5 && (
        <span className="text-black bg-white px-2 py-[2px] font-semibold text-sm absolute top-4 right-4 rounded-sm">
          Novo
        </span>
      )}

      <div className="flex justify-center items-center w-full bg-black text-center text-white font-bold italic text-3xl py-12">
        {title}
      </div>
      <div className="p-4 flex items-center justify-between">
        <div>
          <h2 className="text-black text-2xl font-bold mb-2 h-fit">{title}</h2>
          <span className="text-slate-700 text-sm">
            {formatDate(created_at)}
          </span>
        </div>
        <button
          onClick={deleteASpecificDeck}
          className="p-2 border border-slate-default rounded-sm hover:text-white hover:border-red-500 hover:bg-red-500 transition"
        >
          <Trash size={22} />
        </button>
      </div>
    </Link>
  );
};

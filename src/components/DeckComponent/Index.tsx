import { Link } from "react-router-dom";
import {
  calculateDifferenceBetweenDays,
  formatDate,
} from "../../utils/handleDate";
import { ArrowClockwise, Trash } from "@phosphor-icons/react";
import { decodeSpecialString, sanitizeName } from "../../utils/handleString";

interface DeckComponentProps {
  deckId: number;
  deckName: string;
  created_at: string;
  deleteDeck: (idDeck: number) => void;
}

export const DeckComponent = ({
  deckId,
  deckName,
  created_at,
  deleteDeck,
}: DeckComponentProps) => {
  function deleteASpecificDeck() {
    const confirmDelete = confirm(
      `Tem certeza que deseja deletar o deck ${decodeSpecialString(
        deckName
      )}? Após exclusão não será possível recuperar o deck`
    );
    if (confirmDelete) {
      deleteDeck(Number(deckId));
    }
  }

  return (
    <div className="relative flex flex-col rounded-md overflow-hidden border border-slate-default  hover:border-black transition">
      {calculateDifferenceBetweenDays(new Date().toISOString(), created_at) <=
        5 && (
        <span className="text-black bg-white px-2 py-[2px] font-semibold text-sm absolute top-4 right-4 rounded-sm">
          Novo
        </span>
      )}

      <Link
        to={`/cards/${deckId}@${sanitizeName(deckName)}`}
        className="flex justify-center items-center w-full bg-black text-center text-white font-bold italic text-3xl py-12"
      >
        {deckName}
      </Link>
      <div className="p-4 flex items-center justify-between">
        <Link
          to={`/cards/${deckId}@${sanitizeName(deckName)}`}
          className="w-full"
        >
          <h2 className="text-black text-2xl font-bold mb-2 h-fit block">
            {deckName}
          </h2>
          <span className="text-slate-700 text-sm">
            {formatDate(created_at)}
          </span>
        </Link>
        <div className="flex gap-2">
          <Link
            to={`atualizar-deck?id=${deckId}&name=${deckName}`}
            className="p-2 border border-slate-default rounded-sm hover:text-white hover:border-green-500 hover:bg-green-500 transition"
          >
            <ArrowClockwise size={22} />
          </Link>
          <button
            onClick={deleteASpecificDeck}
            className="p-2 border border-slate-default rounded-sm hover:text-white hover:border-red-500 hover:bg-red-500 transition"
          >
            <Trash size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

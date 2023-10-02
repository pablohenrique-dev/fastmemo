import React from "react";
import { Card } from "../../components/Card/Index";
import { api } from "../../services/api";
import { sanitizeName } from "../../utils/handleString";
import { Deck } from "../../@types/global";
import { Plus } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import { Head } from "../../utils/Head";

export const Home = () => {
  const [decks, setDecks] = React.useState<Deck[] | null>(null);

  async function deleteDeck(idDeck: number) {
    if (!decks) return;
    try {
      await api.delete(`deck/${idDeck}`);
      const currentDecks = decks.filter((deck) => deck.id !== idDeck);
      setDecks(currentDecks);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    async function fetchDecks() {
      const response = await api.get<Deck[]>("/deck");
      setDecks(response.data);
    }
    fetchDecks();
  }, []);

  return (
    <div className="p-6 fade-right">
      <Head
        title="Home"
        description="FastMemo: o aplicativo de repetição espaçada que acelera o aprendizado."
      />
      <h2 className="text-[32px] font-semibold text-black mb-3">
        Meus baralhos
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {decks &&
          decks.map((deck) => {
            return (
              <Card
                key={deck.id}
                title={deck.name}
                created_at={deck.created_at}
                infoCard={`${deck.id}@${sanitizeName(deck.name)}`}
                deleteDeck={deleteDeck}
              />
            );
          })}
        <NavLink
          to="decks/adicionar"
          className="flex flex-col justify-center items-center border border-dashed border-slate-default rounded-md hover:border-green-500 hover:border-2 font-semibold transition-all h-[229px]"
        >
          <Plus size={40} className="mb-2" />
          Adicionar novo baralho
        </NavLink>
      </div>
    </div>
  );
};

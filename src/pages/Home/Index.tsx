import React from "react";
import { Card } from "../../components/Card/Index";
import { api } from "../../services/api";
import { sanitizeName } from "../../utils/handleString";
import { Deck } from "../../@types/global";

export const Home = () => {
  const [decks, setDecks] = React.useState<Deck[] | null>(null);

  React.useEffect(() => {
    async function fetchDecks() {
      const token = localStorage.getItem("tokenUser");
      if (token) {
        const response = await api.get<Deck[]>("/deck", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDecks(response.data);
      }
    }
    fetchDecks();
  }, []);

  return (
    <div className="p-6 fade-right">
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
              />
            );
          })}
        {decks?.length === 0 && <h2>Não há nenhum card ainda! 😭</h2>}
      </div>
    </div>
  );
};

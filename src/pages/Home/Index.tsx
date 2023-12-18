import React from "react";
import { DeckComponent } from "../../components/DeckComponent/Index";
import { api } from "../../services/api";
import { Deck } from "../../@types/global";
import { Plus } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import { Head } from "../../utils/Head";
import { Loading } from "../../components/Loading/Index";

export const Home = () => {
  const [decks, setDecks] = React.useState<Deck[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  async function deleteDeck(deckId: number) {
    if (!decks) return;
    try {
      await api.delete(`deck/${deckId}`);
      const currentDecks = decks.filter((deck) => deck.id !== deckId);
      setDecks(currentDecks);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    async function fetchDecks() {
      try {
        setIsLoading(true);
        const response = await api.get<Deck[]>("/deck");
        setDecks(response.data);
      } catch (error) {
        console.error(error);
        setError(true);
        setDecks(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDecks();
  }, []);

  if (isLoading) return <Loading />;
  if (error)
    return (
      <h3 className="fade-right text-xl p-6">
        Ops...Parece que ocorreu um erro! Por favor, atualize a página!
      </h3>
    );

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
              <DeckComponent
                key={deck.id}
                deckName={deck.name}
                created_at={deck.created_at}
                deckId={deck.id}
                deleteDeck={deleteDeck}
              />
            );
          })}
        <NavLink
          to="adicionar-deck"
          className="flex flex-col justify-center items-center text-center border border-dashed border-slate-default rounded-md hover:border-green-500 hover:border-2 font-semibold transition-all min-h-[229px]"
        >
          <Plus size={40} className="mb-2" />
          Adicionar novo baralho
        </NavLink>
      </div>
    </div>
  );
};

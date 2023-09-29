import React from "react";
import { api } from "../../services/api";
import { formatDate } from "../../utils/handleDate";
import { limitString } from "../../utils/handleString";
import { Card } from "../../@types/global";
import { Loading } from "../../components/Loading/Index";

interface CardListProps {
  infoDeck: string | null;
}

export const CardList = ({ infoDeck }: CardListProps) => {
  const [cards, setCards] = React.useState<Card[] | null>(null);

  React.useEffect(() => {
    async function fetchCards() {
      if (!infoDeck) return;
      const deckId = infoDeck.split("@")[0];
      try {
        const { data } = await api.get<Card[]>(`/card/${deckId}`);
        setCards(data);
      } catch (error) {
        console.error(error);
        setCards(null);
      }
    }
    fetchCards();
  }, [infoDeck]);

  if (cards === null)
    return (
      <div className="relative">
        {" "}
        <Loading />
      </div>
    );
  if (cards?.length === 0)
    return (
      <h3 className="fade-right text-xl">
        Esse baralho ainda não possui cards! 😭
      </h3>
    );
  return (
    <div className="fade-right">
      <table className="w-full">
        <thead>
          <tr className="bg-black text-white rounded-xl">
            <th className="rounded-tl p-2 pl-4 text-left border-r-2 border-white">
              Frente
            </th>
            <th className="p-2 pl-4 text-left border-r-2 border-white">
              Verso
            </th>
            <th className="p-2 pl-4 text-left w-[250px] border-r-2 border-white">
              Criação
            </th>
            <th className="rounded-tr p-2 pl-4 text-left w-[250px]">
              Próxima revisão
            </th>
          </tr>
        </thead>
        <tbody>
          {cards &&
            cards.map((card) => {
              if (card)
                return (
                  <tr
                    key={card.id}
                    className="bg-neutral-100 border-b-2 border-t-2 border-white"
                  >
                    {
                      <>
                        <td className="p-2 pl-4 text-left border-r-2 border-white ">
                          {limitString(card.front, 25)}
                        </td>
                        <td className="p-2 pl-4 text-left border-r-2 border-white">
                          {limitString(card.back, 25)}
                        </td>
                        <td className="p-2 pl-4 text-left border-r-2 border-white">
                          {formatDate(card.created_at)}
                        </td>
                        <td className="p-2 pl-4 text-left">
                          {formatDate(card.next_review)}
                        </td>
                      </>
                    }
                  </tr>
                );
            })}
        </tbody>
      </table>
    </div>
  );
};

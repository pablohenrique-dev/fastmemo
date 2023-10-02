import React from "react";
import { api } from "../../services/api";
import { formatDate } from "../../utils/handleDate";
import { limitString } from "../../utils/handleString";
import { Card } from "../../@types/global";
import { Loading } from "../../components/Loading/Index";
import { ArrowsClockwise, Trash } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

interface CardListProps {
  infoDeck: string | null;
}

export const CardList = ({ infoDeck }: CardListProps) => {
  const [cards, setCards] = React.useState<Card[] | null>(null);

  async function deleteCard(idCard: number) {
    if (cards === null) return;
    const confirmDeleteCard = confirm("Deseja realmente excluír esse card?");
    if (!confirmDeleteCard) return;

    try {
      await api.delete(`/card/${idCard}`);
      setCards(cards.filter((card) => card.id !== idCard));
    } catch (error) {
      console.error(error);
    }
  }

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
            <th className="rounded-tl py-2 text-left w-[50px] border-r-2 border-white">
              <ArrowsClockwise size={22} className="mx-auto" />
            </th>
            <th className="p-2 pl-4 text-left border-r-2 border-white">
              Frente
            </th>
            <th className="p-2 pl-4 text-left border-r-2 border-white">
              Verso
            </th>
            <th className="p-2 pl-4 text-left w-[250px] border-r-2 border-white">
              Criação
            </th>
            <th className="p-2 pl-4 text-left w-[250px] border-r-2 border-white">
              Próxima revisão
            </th>
            <th
              aria-label="Deletar card"
              className="rounded-tr py-2 text-left w-[50px]"
            >
              <Trash size={22} className="mx-auto" />
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
                        <td>
                          <Link
                            to={`atualizar-card?idCard=${card.id}`}
                            className="block py-2 text-green-600 w-full h-max hover:bg-green-600 hover:text-white transition"
                            title="Atualizar card"
                          >
                            <ArrowsClockwise size={22} className="mx-auto" />
                          </Link>
                        </td>
                        <td className="m-2 pl-4 text-left border-r-2 border-white ">
                          {limitString(card.front, 25)}
                        </td>
                        <td className="m-2 pl-4 text-left border-r-2 border-white">
                          {limitString(card.back, 25)}
                        </td>
                        <td className="m-2 pl-4 text-left border-r-2 border-white">
                          {formatDate(card.created_at)}
                        </td>
                        <td className="m-2 pl-4 text-left">
                          {formatDate(card.next_review)}
                        </td>
                        <td>
                          <button
                            onClick={() => deleteCard(card.id)}
                            className="py-2 text-red-500 w-full h-max hover:bg-red-500 hover:text-white transition"
                            title="deletar card"
                          >
                            <Trash size={22} className="mx-auto" />
                          </button>
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

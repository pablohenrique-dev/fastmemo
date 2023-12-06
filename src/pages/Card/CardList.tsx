import React from "react";
import { api } from "../../services/api";
import { formatDate } from "../../utils/handleDate";
import { Card } from "../../@types/global";
import { Loading } from "../../components/Loading/Index";
import { ArrowClockwise, Trash } from "@phosphor-icons/react";
import { Link, useSearchParams } from "react-router-dom";
import { SearchFilter } from "./components/SearchFilter";

interface CardListProps {
  infoDeck: string | null;
}

export const CardList = ({ infoDeck }: CardListProps) => {
  const [cards, setCards] = React.useState<Card[] | null>(null);
  const [searchParams] = useSearchParams();

  const searchInputParam = searchParams.get("search");

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
        const { data } = await api.get<Card[]>(
          `/card/${deckId}?search=${searchInputParam || ""}`
        );
        setCards(data);
      } catch (error) {
        console.error(error);
        setCards(null);
      }
    }
    fetchCards();
  }, [infoDeck, searchInputParam]);

  if (cards === null)
    return (
      <div className="relative">
        <Loading />
      </div>
    );
  if (searchInputParam && cards?.length === 0)
    return (
      <div>
        <SearchFilter />
        <h3 className="fade-right text-xl">Card não encontrado... 😕</h3>
      </div>
    );
  if (cards?.length === 0)
    return (
      <h3 className="fade-right text-xl">
        Esse baralho ainda não possui cards! 😭
      </h3>
    );
  return (
    <div className="fade-right overflow-x-auto">
      <SearchFilter />
      <table className="w-full mb-4">
        <thead>
          <tr className="bg-black text-white rounded-xl">
            <th className="rounded-tl p-2 md:w-[50px] text-left border-r-2 border-white">
              <ArrowClockwise size={22} className="mx-auto" />
            </th>
            <th className="whitespace-nowrap p-2 pl-4 text-left border-r-2 border-white max-w-[200px]">
              Frente
            </th>
            <th className="whitespace-nowrap p-2 pl-4 text-left border-r-2 border-white max-w-[200px]">
              Verso
            </th>
            <th className="whitespace-nowrap p-2 pl-4 text-left border-r-2 border-white">
              Criação
            </th>
            <th className="whitespace-nowrap p-2 pl-4 text-left border-r-2 border-white">
              Próxima revisão
            </th>
            <th
              aria-label="Deletar card"
              className="rounded-tr p-2 text-left w-[50px]"
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
                            <ArrowClockwise size={22} className="mx-auto" />
                          </Link>
                        </td>
                        <td className="max-w-[200px] whitespace-nowrap overflow-hidden m-2 pl-4 text-left border-r-2 border-white text-ellipsis">
                          {card.front}
                        </td>
                        <td className="max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis m-2 pl-4 text-left border-r-2 border-white">
                          {card.back}
                        </td>
                        <td className="m-2 px-4 py-2 text-left border-r-2 border-white">
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

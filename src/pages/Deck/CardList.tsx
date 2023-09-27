import { api } from "../../services/api";
import { formatDate } from "../../utils/handleDate";
import { AlertComponent } from "../../components/Error/Index";
import { limitString } from "../../utils/handleString";
import { Card } from "../../@types/global";

interface CardListProps {
  infoDeck: string | null;
  cards: Card[] | null;
}

export const CardList = ({ infoDeck, cards }: CardListProps) => {
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
      {cards?.length === 0 && (
        <AlertComponent status="error">
          Esse baralho ainda não possui cards!
        </AlertComponent>
      )}
    </div>
  );
};

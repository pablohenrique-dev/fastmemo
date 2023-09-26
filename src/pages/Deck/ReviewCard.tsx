import React from "react";
import { api } from "../../services/api";
import { Button } from "../../components/Button/Index";
import { Card } from "../../@types/global";

interface ReviewCardProps {
  infoDeck: string | null;
  cards: Card[] | null;
}

export const ReviewCard = ({ infoDeck, cards }: ReviewCardProps) => {
  const [currentCardIndex, setCurrentCardIndex] = React.useState(1);
  const [display, setDisplay] = React.useState(false);

  function handleNextCard() {
    setDisplay(false);
    setCurrentCardIndex((index) => index + 1);
  }
  if (cards?.length === 0)
    return (
      <h3 className="fade-right">Nenhuma revisão programada para hoje!</h3>
    );

  return (
    <>
      {cards &&
        cards.map((card, index) => {
          if (index !== currentCardIndex) return;
          else
            return (
              <div className=" flex flex-col justify-between" key={card.id}>
                <h3 className="fade-right">{card.front}</h3>
                <h3 className="fade-right">{display && card.back}</h3>
                {!display && (
                  <button
                    className="w-full text-white bg-black rounded-md py-3 hover:bg-neutral-800"
                    onClick={() => setDisplay(true)}
                  >
                    Ver resposta
                  </button>
                )}
                {display && (
                  <button
                    className="w-full text-white bg-black rounded-md py-3 hover:bg-neutral-800"
                    onClick={handleNextCard}
                  >
                    Próximo card
                  </button>
                )}
              </div>
            );
        })}
      {cards && cards?.length !== 0 && currentCardIndex > cards?.length - 1 && (
        <h3 className="fade-right">
          Parabéns, você fez todas as revisões de hoje! 🎉
        </h3>
      )}
    </>
  );
};

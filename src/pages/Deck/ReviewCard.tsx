import React from "react";
import { api } from "../../services/api";
import { Button } from "../../components/Button/Index";
import { Card } from "../../@types/global";
import { calculateNextReview } from "../../utils/handleDate";

interface ReviewCardProps {
  infoDeck: string | null;
  cards: Card[] | null;
}

export const ReviewCard = ({ infoDeck, cards }: ReviewCardProps) => {
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
  const [display, setDisplay] = React.useState(false);
  const cardsToReviewToday = cards?.filter(
    (card) => new Date(card.next_review).getTime() <= new Date().getTime()
  );

  async function updateNextReviewCard(
    indexCard: number,
    dateNextReview: string
  ) {
    try {
      const { status } = await api.put(`/card/${indexCard}`, {
        next_review: dateNextReview,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleNextCard(
    indexCard: number,
    cardNextReview: string,
    nextReviewController: number
  ) {
    const dateNextReview = calculateNextReview(
      cardNextReview,
      nextReviewController
    );

    await updateNextReviewCard(indexCard, dateNextReview);

    setDisplay(false);
    setCurrentCardIndex((index) => index + 1);
  }

  if (cardsToReviewToday?.length === 0) {
    return (
      <h3 className="fade-right text-xl">
        Nenhuma revisão programada para hoje!
      </h3>
    );
  }

  if (
    cardsToReviewToday &&
    cardsToReviewToday?.length !== 0 &&
    currentCardIndex > cardsToReviewToday?.length - 1
  ) {
    return (
      <h3 className="fade-right text-xl">
        Parabéns, você fez todas as revisões de hoje! 🎉
      </h3>
    );
  }
  return (
    <>
      {cardsToReviewToday &&
        cardsToReviewToday.map((card, index) => {
          if (index !== currentCardIndex) return;
          else
            return (
              <div
                className="flex flex-col justify-between h-[75%]"
                key={card.id}
              >
                <div>
                  <h3 className="fade-right text-xl text-neutral-600">
                    {card.front}
                  </h3>
                  {display && (
                    <>
                      <hr className="mt-4 mb-4" />
                      <h3 className="fade-right text-xl text-neutral-600">
                        {card.back}
                      </h3>
                    </>
                  )}
                </div>
                {!display && (
                  <Button onClick={() => setDisplay(true)}>Ver resposta</Button>
                )}
                {display && (
                  <div className="fade-right grid grid-cols-4 gap-4">
                    <Button
                      onClick={() =>
                        handleNextCard(card.id, card.next_review, 0)
                      }
                    >
                      Resetar
                    </Button>
                    <Button
                      onClick={() =>
                        handleNextCard(card.id, card.next_review, 1)
                      }
                    >
                      Difícil
                    </Button>
                    <Button
                      onClick={() =>
                        handleNextCard(card.id, card.next_review, 3)
                      }
                    >
                      Bom
                    </Button>
                    <Button
                      onClick={() =>
                        handleNextCard(card.id, card.next_review, 5)
                      }
                    >
                      Fácil
                    </Button>
                  </div>
                )}
              </div>
            );
        })}
    </>
  );
};

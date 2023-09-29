import React from "react";
import { api } from "../../services/api";
import { Button } from "../../components/Button/Index";
import { Card } from "../../@types/global";
import { calculateNextReview } from "../../utils/handleDate";
import { ArrowLeft } from "@phosphor-icons/react";
import { Loading } from "../../components/Loading/Index";

interface ReviewCardProps {
  infoDeck: string | null;
}

export const ReviewCard = ({ infoDeck }: ReviewCardProps) => {
  const [cardsToReviewToday, setCardsToReviewToday] = React.useState<
    Card[] | null
  >(null);
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
  const [display, setDisplay] = React.useState(false);

  async function updateNextReviewCard(
    indexCard: number,
    dateNextReview: string
  ) {
    try {
      await api.put(`/card/${indexCard}`, {
        next_review: dateNextReview,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleNextCard(
    indexCard: number,
    nextReviewController: number
  ) {
    const dateNextReview = calculateNextReview(nextReviewController);

    await updateNextReviewCard(indexCard, dateNextReview);

    setDisplay(false);
    setCurrentCardIndex((index) => index + 1);
  }

  function handlePreviousCard() {
    if (currentCardIndex === 0) return;
    setCurrentCardIndex((index) => index - 1);
  }

  React.useEffect(() => {
    async function fetchCardsForToday() {
      const deckId = infoDeck?.split("@")[0];
      if (!deckId) return;
      try {
        const { data } = await api.get<Card[]>(`/cards-today/${deckId}`);
        setCardsToReviewToday(data);
      } catch (error) {
        console.error(error);
        setCardsToReviewToday(null);
      }
    }
    fetchCardsForToday();
  }, [infoDeck]);
  if (cardsToReviewToday === null) {
    return (
      <div className="relative">
        <Loading />
      </div>
    );
  }
  if (cardsToReviewToday?.length === 0) {
    return (
      <h3 className="fade-right text-xl">
        Não há nenhuma revisão programada para hoje neste baralho!
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
                  <div className="flex gap-6">
                    <button
                      disabled={currentCardIndex === 0}
                      onClick={handlePreviousCard}
                      className="border border-slate-default rounded px-4 flex items-center justify-center gap-4 w-full  hover:bg-black hover:text-white hover:border-black transition-all disabled:cursor-not-allowed disabled:text-neutral-600 disabled:hover:bg-white"
                      title="Volta para o card anterior"
                    >
                      <ArrowLeft size={24} />
                      Card anterior
                    </button>
                    <Button onClick={() => setDisplay(true)}>
                      Ver resposta
                    </Button>
                  </div>
                )}
                {display && (
                  <div className="fade-right grid grid-cols-4 gap-4">
                    <Button onClick={() => handleNextCard(card.id, 0)}>
                      Resetar
                    </Button>
                    <Button onClick={() => handleNextCard(card.id, 1)}>
                      Difícil
                    </Button>
                    <Button onClick={() => handleNextCard(card.id, 3)}>
                      Bom
                    </Button>
                    <Button onClick={() => handleNextCard(card.id, 5)}>
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

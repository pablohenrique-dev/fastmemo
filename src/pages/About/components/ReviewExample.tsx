import React from "react";
import { Button } from "../../../components/Button/Index";
import { ArrowLeft } from "@phosphor-icons/react";

const cardsArrExample = [
  {
    id: 1,
    front: "Frente do primeiro card",
    back: "Verso do primeiro card",
  },
  {
    id: 2,
    front: "Frente do segundo card",
    back: "Verso do segundo card",
  },
  {
    id: 3,
    front: "Frente do terceiro card",
    back: "Verso do terceiro card",
  },
];

export const ReviewExample = () => {
  const [displayBackCard, setDisplayBackCard] = React.useState(false);
  const [indexCardToDisplay, setIndexCardToDisplay] = React.useState(0);

  function handlePreviousCard() {
    if (indexCardToDisplay >= 0) {
      setIndexCardToDisplay((index) => index - 1);
      setDisplayBackCard(false);
    }
  }

  function handleNextCard() {
    setIndexCardToDisplay((index) => index + 1);
    setDisplayBackCard(false);
  }

  return (
    <div
      className={`border transition-all rounded-md p-6 mb-6 ${
        indexCardToDisplay >= cardsArrExample.length
          ? "border-green-600 border-2"
          : "border-slate-default"
      }`}
    >
      {indexCardToDisplay >= cardsArrExample.length ? (
        <h3 className="fade-right text-base sm:text-xl">
          Parabéns, você concluiu todas as revisões! 🎉
        </h3>
      ) : (
        <>
          <ul>
            {cardsArrExample.map((card, index) => {
              if (index !== indexCardToDisplay) return null;
              return (
                <li key={card.id}>
                  <>
                    {<span className="fade-right">{card.front}</span>}

                    {displayBackCard && (
                      <>
                        <hr className="mt-4 mb-4 fade-right" />
                        <span className="fade-right">{card.back}</span>
                      </>
                    )}
                  </>
                </li>
              );
            })}
          </ul>
          {displayBackCard ? (
            <div className="grid grid-cols-4 gap-2 md:gap-4 mt-4">
              <Button onClick={handleNextCard}>Resetar</Button>
              <Button onClick={handleNextCard}>Difícil</Button>
              <Button onClick={handleNextCard}>Bom</Button>
              <Button onClick={handleNextCard}>Fácil</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 md:gap-6 md:flex-row mt-4">
              <button
                disabled={indexCardToDisplay === 0}
                onClick={handlePreviousCard}
                className="whitespace-nowrap border border-slate-default rounded px-4 py-3 flex items-center justify-center gap-4 w-full  hover:bg-black hover:text-white hover:border-black transition-all disabled:cursor-not-allowed disabled:text-neutral-600 disabled:hover:bg-white"
                title="Voltar para o card anterior"
              >
                <ArrowLeft size={24} />
                Card anterior
              </button>
              <Button onClick={() => setDisplayBackCard(true)}>
                Ver resposta
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

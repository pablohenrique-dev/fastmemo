import React from "react";
import { Head } from "../../utils/Head";
import { api } from "../../services/api";
import { Loading } from "../../components/Loading/Index";
import { useStatistics } from "../../hooks/useStatistics";
import { Chart } from "./components/Chart";
import { StatsHeader } from "./components/StatsHeader";

export interface CardsRevisedArrResponse {
  id: number;
  count: number;
  created_at: Date;
  updated_at: Date;
  cardId: number;
  userId: number;
}

export const Stats = () => {
  const [cardsRevisedArr, setCardsRevisedArr] = React.useState<
    CardsRevisedArrResponse[] | null
  >(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [initialDate, setInitialDate] = React.useState("");
  const [finalDate, setFinalDate] = React.useState("");
  const { totalReviews, reviewsToday, reviewsPerDay, averageDailyReview } =
    useStatistics(cardsRevisedArr);

  React.useEffect(() => {
    async function fetchCardsRevisedAmount() {
      try {
        setIsLoading(true);
        const { data } = await api.get<CardsRevisedArrResponse[]>(
          `/review-card-counter?initialDate=${initialDate}&finalDate=${finalDate}`
        );
        setCardsRevisedArr(data);
      } catch (error) {
        console.error(error);
        setError(true);
        setCardsRevisedArr(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCardsRevisedAmount();
  }, [initialDate, finalDate]);

  if (error)
    return (
      <h3 className="fade-right text-xl p-6">
        Ops...Parece que ocorreu um erro! Por favor, atualize a página!
      </h3>
    );
  if (!reviewsPerDay && !initialDate && !finalDate)
    return (
      <h3 className="fade-right text-xl p-6">
        Você ainda não fez nenhuma revisão... 😥
      </h3>
    );
  if (isLoading) return <Loading />;
  return (
    <section className="p-6 fade-right">
      <Head title="Estatísticas" description="Veja suas últimas estatistica!" />
      <StatsHeader
        totalReviews={totalReviews}
        reviewsToday={reviewsToday}
        averageDailyReview={averageDailyReview}
        initialDate={initialDate}
        setInitialDate={setInitialDate}
        finalDate={finalDate}
        setFinalDate={setFinalDate}
      />
      {reviewsPerDay ? (
        <Chart data={reviewsPerDay} />
      ) : (
        <h3 className="fade-right text-xl">
          Você ainda não fez nenhuma revisão no período selecionado... 😥
        </h3>
      )}
    </section>
  );
};

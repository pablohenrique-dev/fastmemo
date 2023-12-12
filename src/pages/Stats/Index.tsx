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
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const { totalReviews, reviewsToday, reviewsPerDay, averageDailyReview } =
    useStatistics(cardsRevisedArr);

  React.useEffect(() => {
    async function fetchCardsRevisedAmount() {
      try {
        const { data } = await api.get<CardsRevisedArrResponse[]>(
          "/review-card-counter"
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
  }, []);

  if (error)
    return (
      <h3 className="fade-right text-xl p-6">
        Ops...Parece que ocorreu um erro! Por favor, atualize a página!
      </h3>
    );
  if (!reviewsPerDay)
    return (
      <h3 className="fade-right text-xl p-6">
        Você ainda não fez nenhuma revisão... 😥
      </h3>
    );
  return (
    <section className="p-6 fade-right">
      <Head title="Estatísticas" description="Veja suas últimas estatistica!" />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <StatsHeader
            totalReviews={totalReviews}
            reviewsToday={reviewsToday}
            averageDailyReview={averageDailyReview}
          />
          <Chart data={reviewsPerDay} />
        </>
      )}
    </section>
  );
};

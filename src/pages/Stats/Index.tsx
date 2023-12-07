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
  created_at: string;
  updated_at: string;
  cardId: number;
  userId: number;
}

export const Stats = () => {
  const [cardsRevisedArr, setCardsRevisedArr] = React.useState<
    CardsRevisedArrResponse[] | null
  >(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const { totalReviews, reviewsToday, reviewsPerDay } =
    useStatistics(cardsRevisedArr);

  React.useEffect(() => {
    async function fetchCardsRevisedAmount() {
      try {
        const { data } = await api.get("/review-card-counter");
        setCardsRevisedArr(data);
      } catch (error) {
        console.error(error);
        setCardsRevisedArr(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCardsRevisedAmount();
  }, []);

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
          />

          {reviewsPerDay && <Chart data={reviewsPerDay} />}
        </>
      )}
    </section>
  );
};

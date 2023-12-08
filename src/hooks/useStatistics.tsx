import React from "react";
import { CardsRevisedArrResponse } from "../pages/Stats/Index";
import { formatDateToday } from "../utils/handleDate";
import { groupReviewsByDate } from "../utils/groupReviewsByDate";

export interface ReviewsPerDay {
  created_at: string;
  reviews: number;
}

export const useStatistics = (
  cardsRevisedArr: CardsRevisedArrResponse[] | null
) => {
  const { totalReviews, reviewsToday, reviewsPerDay } = React.useMemo(() => {
    if (!cardsRevisedArr || cardsRevisedArr.length === 0) {
      return { totalReviews: 0, reviewsToday: 0, reviewsPerDay: null };
    }

    const calculateTotalReviews = cardsRevisedArr
      ? cardsRevisedArr.reduce((acc, value) => {
          return acc + value.count;
        }, 0)
      : 0;

    const calculateReviewsToday = cardsRevisedArr
      ? cardsRevisedArr
          .filter((cardsRevisedToday) => {
            return (
              new Date(cardsRevisedToday.created_at)
                .toLocaleString("pt-BR", {
                  timeZone: "America/Sao_Paulo",
                })
                .split(", ")[0] === formatDateToday()
            );
          })
          .reduce((acc, value) => {
            return acc + value.count;
          }, 0)
      : 0;

    const groupedByDate =
      cardsRevisedArr && groupReviewsByDate(cardsRevisedArr);

    return {
      totalReviews: calculateTotalReviews,
      reviewsToday: calculateReviewsToday,
      reviewsPerDay: groupedByDate,
    };
  }, [cardsRevisedArr]);

  return { totalReviews, reviewsToday, reviewsPerDay };
};

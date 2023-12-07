import { formatDate } from "./handleDate";
import { CardsRevisedArrResponse } from "../pages/Stats/Index";
import { ReviewsPerDay } from "../hooks/useStatistics";

/**
 * 
 * @param cardsRevisedArr 
 * @returns exemplo [{created_at: '05/12/2023', reviews: 3}, ...]
 */
export function groupReviewsByDate(cardsRevisedArr: CardsRevisedArrResponse[]){
  //Exemplo de resultado: {05/12/2023: {created_at: '05/12/2023', reviews: 3}, 07/12/2023: {…}}
  const groupedByDate = cardsRevisedArr.reduce(
    (acc: { [key: string]: ReviewsPerDay }, item) => {
      const dateWhitoutTime = formatDate(item.created_at);

      if (!acc[dateWhitoutTime]) {
        acc[dateWhitoutTime] = {
          created_at: dateWhitoutTime,
          reviews: 0,
        };
      }

      acc[dateWhitoutTime].reviews += item.count;
      return acc;
    },
    {}
  )

  //Exemplo de retorno: [{created_at: '05/12/2023', reviews: 3}, ...]
  return Object.values(groupedByDate)
}
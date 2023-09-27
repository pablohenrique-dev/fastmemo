export function formatDate(dateTime: string) {
  //Format of dateTime: 2023-09-23T17:02:54.623Z
  const date = dateTime.split("T")[0];
  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
}

export function calculateNextReview(
  cardNextReview: string,
  nextReviewController: number
): string {
  const cardNextReviewInMilliseconds = new Date(cardNextReview).getTime();
  const millisecondsInOneDay = 86400000;

  const additionalTime = millisecondsInOneDay * nextReviewController;
  const nextReviewInMilliseconds = cardNextReviewInMilliseconds + additionalTime;

  return new Date(nextReviewInMilliseconds).toISOString();
}

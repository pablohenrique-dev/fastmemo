export function formatDate(dateTime: string) {
  //Format of dateTime: 2023-09-23T17:02:54.623Z
  const date = dateTime.split("T")[0];
  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
}

export function calculateNextReview(nextReviewController: number): string {
  const dateNowInMilliseconds = new Date().getTime();
  const millisecondsInOneDay = 86400000;

  const additionalTime = millisecondsInOneDay * nextReviewController;
  const nextReviewInMilliseconds = dateNowInMilliseconds + additionalTime;

  const dateNextReview = new Date(nextReviewInMilliseconds)

  dateNextReview.setHours(0, 0, 0, 0);

  return new Date(dateNextReview).toISOString();
}

/**
 * Recebe como argumento um dateTime no padrão ISO-8601 e retorna um número com o formato DDMMYYYY
 * @param {dateTime} dateTime - Ex: "2023-09-23T17:02:54.623Z"
 * @returns {number} - Ex: 23092023
 */
export function simplifyReturnedDate(dateTime: string): number {
  const date = dateTime.split("T")[0];
  const [year, month, day] = date.split("-");

  return Number(year + month + day);
}

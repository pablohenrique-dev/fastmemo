export function formatDate(dateTime: string) {
  //Format of dateTime: 2023-09-23T17:02:54.623Z
  const date = dateTime.split("T")[0];
  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
}

export function formatDateToday() {
  const dateToday = new Date();

  const year = dateToday.getFullYear();
  const month = String(dateToday.getMonth() + 1);
  const day = String(dateToday.getDate());

  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
}

export function calculateNextReview(nextReviewController: number): string {
  const dateNowInMilliseconds = new Date().getTime();
  const millisecondsInOneDay = 86400000;

  const additionalTime = millisecondsInOneDay * nextReviewController;
  const nextReviewInMilliseconds = dateNowInMilliseconds + additionalTime;

  const dateNextReview = new Date(nextReviewInMilliseconds);

  dateNextReview.setHours(0, 0, 0, 0);

  return new Date(dateNextReview).toISOString();
}

export function calculateDifferenceBetweenDays(
  firstDate: string,
  secondDate: string
) {
  const firstDateWithoutTime = firstDate.split("T")[0];
  const secondDateWithoutTime = secondDate.split("T")[0];

  const firstDateInMilliseconds = new Date(firstDateWithoutTime).getTime();
  const secondDateInMilliseconds = new Date(secondDateWithoutTime).getTime();

  const differenceInDays =
    (firstDateInMilliseconds - secondDateInMilliseconds) /
    (24 * 60 * 60 * 1000);

  return Math.abs(differenceInDays);
}

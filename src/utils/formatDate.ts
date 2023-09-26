export function formatDate(dateTime: string) {
  //Format of dateTime: 2023-09-23T17:02:54.623Z
  const date = dateTime.split("T")[0];
  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
}

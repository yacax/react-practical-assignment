export default function getSimpleDate(timestamp) {
  const newDate = new Date(timestamp);

  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();

  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return `${formattedDate} ${formattedTime}`;
}

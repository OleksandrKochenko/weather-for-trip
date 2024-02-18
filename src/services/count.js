export const oneMin = 60 * 1000;
export const oneHour = 60 * oneMin;
export const oneDay = 24 * oneHour;

export const getRemainingTime = (dateStart, dateToday) => {
  const remaining = dateStart - dateToday;
  if (remaining <= 0) return null;
  const days = Math.floor(remaining / oneDay);
  const hours = Math.floor((remaining % oneDay) / oneHour);
  const minutes = Math.floor((remaining % oneHour) / oneMin);
  const seconds = Math.floor((remaining % oneMin) / 1000);
  return { days, hours, minutes, seconds };
};

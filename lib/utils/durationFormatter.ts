export const durationFormatter = (duration: string) => {
  const totalMinutes = Math.floor(+duration / 60000); // 1000 ms * 60 sec
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let result = '';
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m`;
  return result.trim();
};

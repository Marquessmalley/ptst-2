export function formatTimeFromRFC3339(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';

  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

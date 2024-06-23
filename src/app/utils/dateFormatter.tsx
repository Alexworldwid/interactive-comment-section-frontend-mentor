import { formatDistanceToNow, parseISO } from 'date-fns';

export function timeAgo(timestamp: string): string {
  const date = parseISO(timestamp);
  return formatDistanceToNow(date, { addSuffix: true });
}
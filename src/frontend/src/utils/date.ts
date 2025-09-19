import { format } from 'date-fns';

export const formatDateWithMicroseconds = (date: Date) => {
  // Format up to milliseconds
  const base = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS");
  return `${base}000`; // Add trailing microseconds as '000'
};

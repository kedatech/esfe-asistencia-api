import { z } from 'zod'
export const parseableDate = z.string().refine((value) => {
  const parsedDate = Date.parse(value);
  return !isNaN(parsedDate);
}, "Expected a parseable date string");
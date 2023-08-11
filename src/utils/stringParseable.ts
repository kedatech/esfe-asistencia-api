import { z } from 'zod'

const parseableInteger = (value: string) => {
  const parsedValue = parseInt(value);
  return !isNaN(parsedValue) && parsedValue.toString() === value;
};

/**Asegura que el string puede convertirse a number */
export const stringToInt = z.custom((value) => {
  if (typeof value === 'string' && parseableInteger(value)) {
    return { success: value, message: 'El valor debe ser un numero' };
  } else {
    return { success: false, message: 'El valor debe ser un numero' };
  }
});
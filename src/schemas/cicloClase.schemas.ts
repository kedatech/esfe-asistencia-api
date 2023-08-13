import { object, TypeOf, z } from 'zod';
import { stringToInt } from '../utils/stringParseable'

const id = z.number({required_error: 'El ID del espacio es requerido'}).int().positive()
const name = z.string({required_error : 'El nombre es requerido' })
const startDate = z.date()
const endDate = z.date()

export const createEspacioSchema = object({
  body: object({
    name,
    startDate,
    endDate
  }).strict(),
});

export const updateEspacioSchema = object({
  params: object({
    id: stringToInt
  }),
  body: object({
    name: name.optional(),
    capacity: startDate.optional(),
    espacioTypeId: endDate.optional()
  })
    .partial()
    .refine((data) => data.capacity !== undefined || data.espacioTypeId !== undefined, {
      message: 'Al menos una propiedad debe ser proporcionada para actualizar',
    }),
});

export const deleteEspacioSchema = object({
  params: object({
    id: stringToInt
  })
});

export const getEspacioSchema = object({
  params: object({
    id: stringToInt
  })
});

export type CreateEspacioInput = TypeOf<typeof createEspacioSchema>['body'];
export type UpdateEspacioInput = TypeOf<typeof updateEspacioSchema>['body'];
export type DeleteEspacioParams = TypeOf<typeof deleteEspacioSchema>['params'];
export type GetEspacioParams = TypeOf<typeof getEspacioSchema>['params'];
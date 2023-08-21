import { object, TypeOf, z } from 'zod';
import { stringToInt } from '../utils/stringParseable'

const id = z.number({required_error: 'El ID del ciclo  es requerido'}).int().positive()
const name = z.string({required_error : 'El nombre es requerido' })
const startDate = z.date()
const endDate = z.date()

export const createSchema = object({
  body: object({
    name,
    startDate,
    endDate
  }).strict(),
});

export const updateSchema = object({
  params: object({
    id: stringToInt
  }),
  body: object({
    name: name.optional(),
    capacity: startDate.optional(),
    TypeId: endDate.optional()
  })
    .partial()
    .refine((data) => data.capacity !== undefined || data.TypeId !== undefined, {
      message: 'Al menos una propiedad debe ser proporcionada para actualizar',
    }),
});

export const deleteSchema = object({
  params: object({
    id: stringToInt
  })
});

export const getSchema = object({
  params: object({
    id: stringToInt
  })
});

export type CreateInput = TypeOf<typeof createSchema>['body'];
export type UpdateInput = TypeOf<typeof updateSchema>['body'];
export type DeleteParams = TypeOf<typeof deleteSchema>['params'];
export type GetParams = TypeOf<typeof getSchema>['params'];
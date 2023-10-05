import { object, TypeOf, z } from 'zod';
import { stringToInt } from '../utils/validators/stringParseable'
import { parseableDate } from '../utils/validators/dateParseable'

const id = z.number({required_error: 'El ID del ciclo  es requerido'}).int().positive()
const uid = z.string({required_error : 'El uid es requerido' })
const fecha = parseableDate

export const createSchema = object({
  body: object({
    uid,
    fecha,
    nomenclaturaId: id,
    criterioId: id
  }).strict(),
});

export const updateSchema = object({
  params: object({
    id: stringToInt
  }),
  body: object({
    nomenclaturaId: id,
    criterioId: id
  })
    .partial()
    .refine((data) => data.nomenclaturaId !== undefined || data.criterioId !== undefined, {
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
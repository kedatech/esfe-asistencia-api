import { z, object, TypeOf } from 'zod'
import { stringToInt } from '../utils/validators/stringParseable'

const validId = z.number({required_error: 'El id es requerido'}).int().positive()
const startDate = z.date()
const endDate = z.date()

export const createSchema = object({
  body: object({
    cicloId: validId,
    espacioId: validId,
    duracionId: validId,
    diaId: validId,
    docenteId: validId,
    grupoId: validId,
    moduloId: validId,
    startDate,
    endDate
  }).strict(),
});

export const updateSchema = object({
  params: object({
    id: stringToInt
  }),
  body: object({
    cicloId: validId,
    espacioId: validId,
    duracionId: validId,
    diaId: validId,
    docenteId: validId,
    grupoId: validId,
    moduloId: validId,
    startDate,
    endDate
  })
    .partial()
    .refine((data) => data.cicloId !== undefined || data.espacioId !== undefined, {
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

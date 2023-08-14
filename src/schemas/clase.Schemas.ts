import { z, object, TypeOf } from 'zod'
import { stringToInt } from '../utils/stringParseable'

const validId = z.number({required_error: 'El id es requerido'}).int().positive()
const startDate = z.date()
const endDate = z.date()

export const createEspacioSchema = object({
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

export const updateEspacioSchema = object({
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

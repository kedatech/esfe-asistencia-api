import { object, TypeOf, z } from 'zod';
import { stringToInt } from '../utils/validators/stringParseable'

const id = z.number({required_error: 'El ID del espacio es requerido'}).int().positive()

export const getSchema = object({
  params: object({
    id: stringToInt
  })
});

export type GetParams = TypeOf<typeof getSchema>['params'];
// export type ListsQuery = TypeOf<typeof listsSchema>['query'];

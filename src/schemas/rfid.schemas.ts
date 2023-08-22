import { object, TypeOf, z } from 'zod';
import { stringToInt } from '../utils/validators/stringParseable'
import { uidRFIDValidator } from '../utils/validators/isRFID'

// model Rfid {
//   id           Int   @id @default(autoincrement())
//   uid      String
//   estudianteId Int
// }
const id = z.number({required_error: 'El ID del espacio es requerido'}).int().positive()
const estudianteId = z.number({ required_error: 'El estudianteId es requerido'}).int().positive()


export const createSchema = object({
  body: object({
    uid: uidRFIDValidator,
    estudianteId
  })
  .strict()
});

export const updateSchema = object({
  params: object({
    id: stringToInt
  }),
  body: object({
    uid: uidRFIDValidator,
    estudianteId
  })
    .partial()
    .refine((data) => data.estudianteId !== undefined || data.uid !== undefined, {
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

// export const listsSchema = object({
//   query: object({
//     type: union([
//       z.nativeEnum(Type, { invalid_type_error: 'Tipo de  inválido' }),
//       z.undefined(),
//     ]),
//   }),
// });

export type CreateInput = TypeOf<typeof createSchema>['body'];
export type UpdateInput = TypeOf<typeof updateSchema>['body'];
export type DeleteParams = TypeOf<typeof deleteSchema>['params'];
export type GetParams = TypeOf<typeof getSchema>['params'];
// export type ListsQuery = TypeOf<typeof listsSchema>['query'];

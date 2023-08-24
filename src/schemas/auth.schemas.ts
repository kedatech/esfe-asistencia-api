import { object, TypeOf, z } from 'zod';

const correo = z.string({required_error : 'El nombre es requerido' })
const contrasenia = z.string({required_error : 'La constraseña es requerido' })

export const loginSchema = object({
  body: object({
    correo,
    contrasenia,
  }).strict(),
});

export type LoginInput = TypeOf<typeof loginSchema>['body'];

// Esta es una función utilizada para estandarizar las respuestas de los services
export interface IReturn<T> {
  data: T;
  message: string;
  success: boolean;
}

/**
 * @param data <T> o null La información devuelta en el return
 * @param message string con mensaje de error o cumplimiento
 * @param success boolean si el servicio fue correctamente
 * @returns IReturn<T>
 */
export function returnProvider<T>(data: T, message: string, success: boolean): IReturn<T> {
  return {
    data,
    message,
    success
  };
}
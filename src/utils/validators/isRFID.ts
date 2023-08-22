import { z } from 'zod'
// Función para validar un UID de RFID
function esUIDRFIDValido(uid: string) {
  // Verifica si el UID tiene una longitud de 8, 10, 12 o 14 caracteres (dependiendo del formato)
  if (![8, 10, 12, 14].includes(uid.length)) {
    return false;
  }

  // Verifica que el UID solo contenga caracteres hexadecimales (0-9, A-F)
  const hexRegex = /^[0-9A-Fa-f]+$/;
  return hexRegex.test(uid);
}

// Crear un validador personalizado con zod
export const uidRFIDValidator = z.custom((uid) => {
  if (!esUIDRFIDValido(String(uid))) {
    throw new Error("UID de RFID inválido");
  }
  return uid;
});
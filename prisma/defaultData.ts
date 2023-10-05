export const espacioTypes = ['laboratorio', 'aula', 'virtual']
export const virtualEspacios = ['sincrono', 'asincrono']
// export const roles = ['estudiante', 'docente']
// export const turnos = ['mañana', 'tarde', 'noche']

export const duracionesClase = [
  {
    startTime: new Date(0, 0, 0, 7, 30),//inicio a receso
    endTime: new Date(0, 0, 0, 9, 0),  
  },
  {
    startTime: new Date(0, 0, 0, 9, 30), // receso a fin
    endTime: new Date(0, 0, 0, 12, 0),  
  },
  {
    startTime: new Date(0, 0, 0, 7, 30), // inicio a fin
    endTime: new Date(0, 0, 0, 12, 0),  
  }
]

export const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado']

export const criterios = [
  {
    nombre: 'SESIÓN PRESENCIAL',
    descripcion: 'Cuando el estudiante asiste a la clase presencial'
  },
  {
    nombre: 'SESIÓN SINCRÓNICA',
    descripcion: 'Cuando el estudiante participa en sesión sincrónica programada'
  },
  {
    nombre: 'SESIÓN ASINCRÓNICA',
    descripcion: 'Cuando el estudiante realiza actividades de aprendizaje programadas para ser realizadas de forma virtual con asesoría del docente'
  },
  {
    nombre: 'N/A',
    descripcion: 'Por asueto o suspensión debido a emergencias emitidas por parte de las autoridades.'
  },
  {
    nombre: 'NO ASISTIÓ',
    descripcion: 'Cuando el estudiante no asiste de forma presencial o no participa en sesión sincrónica o asincrónica programada'
  }
];
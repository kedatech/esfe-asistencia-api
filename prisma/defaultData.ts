export const espacioTypes = ['laboratorio', 'aula']
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


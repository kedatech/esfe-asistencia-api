import { CreateInput, UpdateInput} from '../schemas/asistencia.schemas'
import { returnProvider } from '../utils/providers/ReturnProvider'
import { prisma } from '../lib/prisma'

import { DocenteService, EstudianteService} from './external' // apis externas
import { RfidService } from './rfid.services'

const docenteService = new DocenteService()
const rfidService = new RfidService()
const estudianteService = new EstudianteService()

export class AsistenciaService {
  getAll(){
    return prisma.asistencia.findMany()
  }

  getOne(id: number){
    return prisma.asistencia.findUnique({
      where: { id: id }
    })
  }

  async create(data: CreateInput){
    try { 
      const estudiante = (await rfidService.getAll()).filter(el => el.uid === data.uid)[0]

      if(estudiante === null) return

      const result = await prisma.asistencia.create({
        data: {...data, estudianteId: estudiante.id}
      })
  
      return returnProvider(result, 'Asistencia Creada', true)
    } catch (error) {
      return returnProvider(null, String(error), false)
    }
  }

  async update(id: number, data: UpdateInput){
    try {
  
      const result = await prisma.asistencia.update({
        where: { id: id},
        data
      })
    } catch (error) {
      return returnProvider(null, String(error), false)
    }
  }

  async delete(id: number) {
    try {
      await prisma.asistencia.delete({
        where: { id: id },
      });

      return returnProvider(null, 'Clase Eliminada', true);
    } catch (error) {
      return returnProvider(null, String(error), false);
    }
  }
}
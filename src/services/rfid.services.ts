import { CreateInput, UpdateInput} from '../schemas/rfid.schemas'
import { prisma } from '../lib/prisma'
import { uidRFIDValidator } from '../utils/validators/isRFID'
import { EstudianteService } from './external/estudiante.services'

const estudianteService = new EstudianteService()
export class CicloClase {
  getAll(){
    return prisma.clase.findMany()
  }

  getOne(id: number){
    return prisma.rfid.findUnique({
      where: { id: id }
    })
  }

  async create(data: CreateInput){
    const estudiantes = await estudianteService.getAll();

    const validUid = uidRFIDValidator.safeParse(data.uid).success

    const queryEstudiante = estudiantes.data.filter( el => el.id == data.estudianteId)
    return prisma.rfid.create({
      data: data
    })
  }

  update(id: number, data: UpdateInput){
    return prisma.rfid.update({
      where: { id: id},
      data
    })
  }

  delete(id: number){
    return prisma.rfid.delete({
      where: { id: id }
    })
  }
}
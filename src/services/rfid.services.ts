import { CreateInput, UpdateInput} from '../schemas/rfid.schemas'
import { prisma } from '../lib/prisma'
import { uidRFIDValidator } from '../utils/validators/isRFID'
import { returnProvider } from '../utils/providers/ReturnProvider'
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
    try {
      if(!await this.validData(data)) returnProvider(null, 'Datos incorrectos', false)// validar uuid valido y que exista estudiante

      const result = await prisma.rfid.create({
        data: data
      })
      return returnProvider(result, 'RFID uid guardado', true)

    } catch (error) {
      return returnProvider([], String(error), false)
    }
    
  }

  async update(id: number, data: UpdateInput){
    try {
      if(!uidRFIDValidator.safeParse(data.uid).success) return false

      const result = prisma.rfid.update({
        where: { id: id},
        data
      })
      
      return returnProvider(result, 'UUID actualizado', true)
    } catch (error) {
      return returnProvider([], String(error), false)
    }
  }

  delete(id: number){
    return prisma.rfid.delete({
      where: { id: id }
    })
  }

  async validData(data:CreateInput){
    const estudiantes = await estudianteService.getAll();
    const validUid = uidRFIDValidator.safeParse(data.uid).success
    const queryEstudiante = estudiantes.data.filter( el => el.id == data.estudianteId)
    if(!validUid && !queryEstudiante) return false
    return true
  }
}


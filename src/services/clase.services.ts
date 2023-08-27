import { CreateInput, UpdateInput} from '../schemas/clases.schemas'
import { returnProvider } from '../utils/providers/ReturnProvider'
import { prisma } from '../lib/prisma'

import { DocenteService, GrupoService, ModuloService} from './external' // apis externas

const docenteService = new DocenteService()
const grupoService = new GrupoService()
const moduloService = new ModuloService()

export class ClaseService {
  getAll(){
    return prisma.clase.findMany()
  }

  getOne(id: number){
    return prisma.clase.findUnique({
      where: { id: id }
    })
  }

  async create(data: CreateInput){
    try {
      if(!this.validData(data)) return returnProvider(null, 'Datos Incorrectos', false)
      const result = await prisma.clase.create({
        data: data
      })
  
      return returnProvider(result, 'Clase Creada', true)
    } catch (error) {
      return returnProvider(null, String(error), false)
    }
  }

  async update(id: number, data: UpdateInput){
    try {
      if(!this.validData(data)) return returnProvider(null, 'Datos incorrectos', false)
      const result = await prisma.clase.update({
        where: { id: id},
        data
      })
    } catch (error) {
      return returnProvider(null, String(error), false)
    }
  }

  async delete(id: number) {
    try {
      await prisma.clase.delete({
        where: { id: id },
      });

      return returnProvider(null, 'Clase Eliminada', true);
    } catch (error) {
      return returnProvider(null, String(error), false);
    }
  }

  async validData(data: CreateInput | UpdateInput) {
    const docentes = await docenteService.getAll();
    const modulos = await moduloService.getAll();
    const grupos = await grupoService.getAll();

    const isValidDocente = data.docenteId === undefined || docentes.data.some(el => el.id === data.docenteId);
    const isValidModulo = data.moduloId === undefined || modulos.data.some(el => el.id === data.moduloId);
    const isValidGrupo = data.grupoId === undefined || grupos.data.some(el => el.id === data.grupoId);

    return isValidDocente && isValidModulo && isValidGrupo;
  }
}
import { CreateEspacioInput, UpdateEspacioInput } from '../schemas/cicloClase.schemas'
import { prisma } from '../lib/prisma'

export class CicloClase {
  getAll(){
    return prisma.cicloClase.findMany()
  }

  getOne(id: number){
    return prisma.cicloClase.findUnique({
      where: { id: id }
    })
  }

  create(data: CreateEspacioInput){
    return prisma.cicloClase.create({
      data: data
    })
  }

  update(id: number, data: UpdateEspacioInput){
    return prisma.cicloClase.update({
      where: { id: id},
      data
    })
  }

  delete(id: number){
    return prisma.espacio.delete({
      where: { id: id }
    })
  }
}
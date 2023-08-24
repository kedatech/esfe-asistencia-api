import { CreateInput, UpdateInput } from '../schemas/cicloClase.schemas'
import { prisma } from '../lib/prisma'

export class CicloClaseServices {
  getAll(){
    return prisma.cicloClase.findMany()
  }

  getOne(id: number){
    return prisma.cicloClase.findUnique({
      where: { id: id }
    })
  }

  create(data: CreateInput){
    return prisma.cicloClase.create({
      data: data
    })
  }

  update(id: number, data: UpdateInput){
    return prisma.cicloClase.update({
      where: { id: id},
      data
    })
  }

  delete(id: number){
    return prisma.cicloClase.delete({
      where: { id: id }
    })
  }
}
import { CreateEspacioInput } from '../schemas/espacio.schemas'
import { prisma } from '../lib/prisma'

export class EspacioService {
  getAll(){
    return prisma.espacio.findMany()
  }

  getOne(id: number){
    return prisma.espacio.findUnique({
      where: { id: id }
    })
  }

  create(data: CreateEspacioInput){
    return prisma.espacio.create({
      data: data
    })
  }

  delete(id: number){
    return prisma.espacio.delete({
      where: { id: id }
    })
  }
}
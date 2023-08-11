import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const espacioTypes = ['laboratorio', 'aula']

const roles = ['estudiante', 'docente']

async function main(){
  
  espacioTypes.forEach(async (el) => {
    const espacio = await prisma.espacioType.upsert({
      where: { name: el },
      update: {},
      create: {
        name: el
      },
    })
    console.log('espacio', espacio)
  })

  roles.forEach( async (el) => {
    const rol = await prisma.rol.upsert({
      where: { name: el},
      update: {},
      create: {
        name: el
      }
    })
    console.log('rol', rol)
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });

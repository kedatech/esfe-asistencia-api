import { PrismaClient } from '@prisma/client'
import { duracionesClase, espacioTypes, roles } from './defaultData'

const prisma = new PrismaClient()


async function main() {
	espacioTypes.forEach(async (el) => {
		const espacio = await prisma.espacioType.upsert({
			where: { name: el },
			update: {},
			create: { name: el },
		})
		console.log('espacio', espacio)
	})

	roles.forEach(async (el) => {
		const rol = await prisma.rol.upsert({
			where: { name: el },
			update: {},
			create: { name: el },
		})
		console.log('rol', rol)

	})

  // turnos.forEach(async (el) => {
  //   const turno = await prisma.turno.upsert({
  //     where: { name: el },
  //     update: {},
  //     create: { name: el },
  //   })
  //   console.log('turno', turno)
  // })

  duracionesClase.forEach(async (el) => {
    const duracion = await prisma.duracion.upsert({
      where: {
        startTime_endTime: {
          startTime: el.startTime,
          endTime: el.endTime,
        },
      },
      update: {},
      create: { startTime: el.startTime, endTime: el.endTime },
    });
    console.log('duración', duracion);
  });
}

main()
	.then(() => prisma.$disconnect())
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit()
	})

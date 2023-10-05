import { PrismaClient } from '@prisma/client'
import { duracionesClase, espacioTypes, virtualEspacios, dias, criterios} from './defaultData'

const prisma = new PrismaClient()


async function main() {
	espacioTypes.forEach(async (el) => {
		const espacio = await prisma.espacioType.upsert({
			where: { name: el },
			update: {},
			create: { name: el },
		})

		console.log('espacio', espacio)

		if(espacio.name === 'virtual'){
			virtualEspacios.forEach(async (el) => {
				const rol = await prisma.espacio.upsert({
					where: { name: espacio.name },
					update: {},
					create: { capacity: 40, name: el, espacioTypeId: espacio.id},
				})
				console.log('virtual espacio', rol)
		
			})
		}
	})

	criterios.forEach(async (el) => {
    const turno = await prisma.criterio.upsert({
      where: { nombre: el.nombre },
      update: {},
      create: { nombre: el.nombre, descripcion: el.descripcion },
    })
    console.log('turno', turno)
  })

  dias.forEach(async (el) => {
    const turno = await prisma.dia.upsert({
      where: { name: el },
      update: {},
      create: { name: el },
    })
    console.log('turno', turno)
  })

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

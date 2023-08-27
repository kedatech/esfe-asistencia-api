import { esfeapi } from './config';
import { returnProvider, IReturn } from '../../utils/providers/ReturnProvider';
import { Estudiante } from '../../utils/interface/Estudiante';
import { GrupoService } from './grupo.services';
import { prisma } from '../../lib/prisma'

const grupoService = new GrupoService();
const route = '/estudiantes';

interface EstudianteReturn extends Estudiante {
  grupoName: string;
  rfid: string | null;
}

export class EstudianteService {
  async getAll(): Promise<IReturn<Estudiante[]>> {
    try {
      const { data } = await esfeapi.get<Estudiante[]>(route);
      return returnProvider(data, 'Estudiantes fetched', true);
    } catch (error) {
      return returnProvider([], String(error), false);
    }
  }

  async getOne(id: number): Promise<IReturn<Estudiante | null>> {
    try {
      const { data } = await esfeapi.get<Estudiante[]>(route);
      const estudiante = data.find((e) => e.id === id);

      if (!estudiante) {
        return returnProvider(null, 'No existe un Estudiante', false);
      }

      return returnProvider(estudiante, 'Estudiante obtenido', true);
    } catch (error) {
      return returnProvider(null, String(error), false);
    }
  }

  async getByDocente(id: number): Promise<IReturn<EstudianteReturn[]>> {
    try {
      const { data } = await esfeapi.get<Estudiante[]>(route);

      const grupos = await grupoService.getByDocenteId(id);
      const idsGruposDocente = grupos.data.map((grupo) => grupo.id);

      const filtered = data.filter((estudiante) => idsGruposDocente.includes(estudiante.grupoId));

      const withGrupoName = await Promise.all(
        filtered.map(async (estudiante) => {
          const grupoEstudiante = grupos.data.find((el) => el.id === estudiante.grupoId);
          
          // const rfid = await rfidService.getOne(estudiante.id);
          const rfid = (await prisma.rfid.findMany()).find(el => el.estudianteId === estudiante.id)

          const uid = rfid ? rfid.uid : null;

          const result: EstudianteReturn = {
            ...estudiante,
            grupoName: grupoEstudiante ? `Grupo ${grupoEstudiante.codigo}` : '',
            rfid: uid
          };

          return result;
        })
      );

      return returnProvider(withGrupoName, 'Estudiantes fetched', true);
    } catch (error) {
      return returnProvider([], String(error), false);
    }
  }
}

export default EstudianteService;
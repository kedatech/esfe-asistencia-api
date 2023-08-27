import { esfeapi } from './config'
import { returnProvider, IReturn} from '../../utils/providers/ReturnProvider'
import { Estudiante } from '../../utils/interface/Estudiante'

import { GrupoService} from './grupo.services'
const grupoService = new GrupoService()

const route = '/estudiantes'

export class EstudianteService {
  EstudianteService(){

  }

  async getAll(): Promise<IReturn<Estudiante[]>> {
    try {
      const { data } = await esfeapi.get<Estudiante[]>(route)
      console.log(data)
      return returnProvider(data, 'Estudiantes fetched', true)
    } catch (error) {
      return returnProvider([], String(error), false)
    }
  }

  async getOne(id: number): Promise<IReturn<Estudiante | null>>{
    try {
      const { data } = await esfeapi.get<Estudiante[]>(route)
      if(!data) return returnProvider(null, 'error al obtener Estudiante', false)
  
      const Estudiante = data.filter( Estudiante => Estudiante.id === id)[0]
  
      if(!Estudiante) return returnProvider(null, 'no existen un Estudiante', false)
      return returnProvider(Estudiante, 'Estudiante obtenido', true)
      
    } catch (error) {
      return returnProvider(null, String(error), false)
    }
  }

  async getByDocente(id: number): Promise<IReturn<Estudiante[]>> {
    try {
      const { data } = await esfeapi.get<Estudiante[]>(route)

      const grupos = await grupoService.getByDocenteId(id);
      const idsGruposDocente = grupos.data.map( grupo => grupo.id);
      
      console.log('grupos', idsGruposDocente)
      const filtered = data.filter( estudiante => idsGruposDocente.includes(estudiante.grupoId))

      const withGrupoName = filtered.map( estudiante => {
        const grupoEstudiante = grupos.data.filter(el => el.id === estudiante.grupoId)[0]

        if(grupoEstudiante !== undefined) {
          const result = {
            ...estudiante,
            grupoName: String(`Grupo ${grupoEstudiante.codigo}`)
          }
          console.log("abeja")
          return result
        }
        return estudiante
      })

      return returnProvider(withGrupoName, 'Estudiantes fetched', true)
    } catch (error) {
      return returnProvider([], String(error), false)
    }
  }
}
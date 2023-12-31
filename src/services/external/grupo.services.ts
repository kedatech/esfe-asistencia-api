import { esfeapi } from './config'
import { returnProvider, IReturn} from '../../utils/providers/ReturnProvider'
import { Grupo } from '../../utils/interface/Grupo'

const route = '/grupos'

export class GrupoService {
  GrupoService(){

  }

  async getAll(): Promise<IReturn<Grupo[]>> {
    try {
      const { data } = await esfeapi.get<Grupo[]>(route)
      console.log(data)
      return returnProvider(data, 'grupos fetched', true)
    } catch (error) {
      return returnProvider([], 'error', false)
    }
  }

  async getOne(id: number): Promise<IReturn<Grupo | null>>{
    try {
      const { data } = await esfeapi.get<Grupo[]>(route)
      if(!data) return returnProvider(null, 'error al obtener grupos', false)
  
      const docente = data.filter( docente => docente.id === id)[0]
  
      if(!docente) return returnProvider(null, 'no existen un grupo', false)
      return returnProvider(docente, 'docente obtenido', true)
      
    } catch (error) {
      return returnProvider(null, 'error al obtener grupo', false)
    }
  }

  async getByDocenteId(id: number): Promise<IReturn<Grupo[]>> {
    try {
      const { data } = await esfeapi.get<Grupo[]>(route)
      
      const filtered = data.filter( grupo => grupo.docenteId === id)
      if(filtered.length === 0) return returnProvider(filtered, `El docente con ${id} no tiene grupos`, true)
      return returnProvider(filtered, `Grupos del docente con id ${id}`, true)
    } catch (error) {
      return returnProvider([], 'error al obtener grupo', false)
    }
  }
}
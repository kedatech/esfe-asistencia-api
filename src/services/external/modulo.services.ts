import { esfeapi } from './config'
import { returnProvider, IReturn} from '../../utils/providers/ReturnProvider'
import { Modulo } from '../../utils/interface/Modulo'

const route = '/modulos'

export class ModuloService {
  ModuloService(){

  }

  async getAll(): Promise<IReturn<Modulo[]>> {
    try {
      const { data } = await esfeapi.get<Modulo[]>(route)
      console.log(data)
      return returnProvider(data, 'Modulos fetched', true)
    } catch (error) {
      return returnProvider([], 'error', false)
    }
  }

  async getOne(id: number): Promise<IReturn<Modulo | null>>{
    try {
      const { data } = await esfeapi.get<Modulo[]>(route)
      if(!data) return returnProvider(null, 'error al obtener Modulos', false)
  
      const docente = data.filter( docente => docente.id === id)[0]
  
      if(!docente) return returnProvider(null, 'no existen un Modulo', false)
      return returnProvider(docente, 'docente obtenido', true)
      
    } catch (error) {
      return returnProvider(null, 'error al obtener Modulo', false)
    }
  }
}
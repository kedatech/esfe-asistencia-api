import { esfeapi } from './config'
import { returnProvider, IReturn} from '../../utils/ReturnProvider'
import { Docente } from '../../utils/interface/Docente'

const route = '/docentes'

export class DocenteService {
  DocenteService(){

  }

  async getAll(): Promise<IReturn<Docente[]>> {
    try {
      const { data } = await esfeapi.get<Docente[]>(route)
      console.log(data)
      return returnProvider(data, 'docentes fetched', true)
    } catch (error) {
      return returnProvider([], 'error', false)
    }
  }

  async getOne(id: number): Promise<IReturn<Docente | null>>{
    try {
      const { data } = await esfeapi.get<Docente[]>(route)
      if(!data) return returnProvider(null, 'error al obtener docente', false)
  
      const docente = data.filter( docente => docente.id === id)[0]
  
      if(!docente) return returnProvider(null, 'no existen un docente', false)
      return returnProvider(docente, 'docente obtenido', true)
      
    } catch (error) {
      return returnProvider(null, 'error al obtener docente', false)
    }
  }
}
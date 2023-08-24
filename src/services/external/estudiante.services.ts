import { esfeapi } from './config'
import { returnProvider, IReturn} from '../../utils/providers/ReturnProvider'
import { Estudiante } from '../../utils/interface/Estudiante'

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
}
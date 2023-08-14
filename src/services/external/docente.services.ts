import { esfeapi } from './config'

const entity = '/docentes'

interface Docente {
  id: number,
  nombre: string,
  correo: string,
  telefono: string,
  carreraId: number
}

export class DocenteService {
  async getAll(){
    const { data } = await esfeapi.get(entity)
    console.log(data)
    return data
  }

  async getOne(id: number){
    const { data } = await esfeapi.get<Docente[]>(entity)
    if(!data) return false

    const result = data.filter( docente => docente.id === id)[0]

    if(!result) return false
    return result
  }
}
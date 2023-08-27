import { Router, Request, Response } from 'express'
import { getSchema } from '../schemas/estudiante.schemas'
import { validate } from '../../middlewares/validate'
import { EstudianteService } from '../services/external/estudiante.services' 

const service = new EstudianteService()

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try{
    const data = await service.getAll()
    res.json(data)
  }catch (error){
    res.json(error)
  }
})

router.get('/:id',
validate(getSchema),
async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const del = await service.getOne(id)
    res.json(del)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get('/docente/:id',
validate(getSchema),
async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    console.log('docente id',id)
    const result = await service.getByDocente(id)
    res.json(result)
  } catch (error) {
    res.status(400).json(error)
  }
})

export { router }
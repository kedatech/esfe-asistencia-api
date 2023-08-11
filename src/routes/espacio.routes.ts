import { Router, Request, Response } from 'express'
import { createEspacioSchema } from '../schemas/espacio.schemas'
import { validate } from '../../middlewares/validate'
import { EspacioService } from '../services/espacio.services'

const service = new EspacioService()

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const data = await service.getAll()
  res.json(data)
})

router.post('/', 
validate(createEspacioSchema), 
async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    const data = await service.create(req.body)
    res.json(data)
  } catch (error) {
    res.status(400).json(error)
  }
})
export { router }
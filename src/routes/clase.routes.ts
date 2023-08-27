import { Router, Request, Response } from 'express'
import { createSchema, deleteSchema, updateSchema} from '../schemas/clase.schemas'
import { validate } from '../../middlewares/validate'
import { ClaseService } from '../services/clase.services'

const service = new ClaseService()

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try{
    const data = await service.getAll()
    res.json(data)
  }catch (error){
    res.json(error)
  }
})

router.post('/', 
validate(createSchema), 
async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    const data = await service.create(req.body)
    res.json(data)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete('/:id',
validate(deleteSchema),
async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    console.log(id)
    const del = await service.delete(id)
    res.json(del)
  } catch (error) {
    res.status(400).json(error)
  }
})


router.patch('/:id',
validate(updateSchema),
async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const upd = await service.update(id, req.body)
    res.json(upd)
  } catch (error) {
    res.status(400).json(error)
  }
})

export { router }
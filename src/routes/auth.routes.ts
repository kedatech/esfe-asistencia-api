import { Router, Request, Response } from 'express'
import { loginSchema } from '../schemas/auth.schemas'
import { validate } from '../../middlewares/validate'
import { DocenteService } from '../services/external/docente.services'

const service = new DocenteService()

const router = Router()

router.post('/login', 
validate(loginSchema), 
async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    const { data, success, message} = await service.getAll()
    if(! success) {
      res.status(400).json({message})
      return 
    }
    const docenteLogin = data.filter( el => {
      if(el.correo === req.body.correo && el.contrasenia === req.body.contrasenia){
        return el
      }
    })

    if(!docenteLogin[0]){
      res.status(400).json({message: 'Credenciales incorrectas'})
      return
    }

    res.json(docenteLogin[0])
  } catch (error) {
    res.status(400).json(error)
  }
})


export { router }
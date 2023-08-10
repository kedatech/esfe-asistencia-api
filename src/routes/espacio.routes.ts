import { Router, Request, Response } from 'express'
const router = Router()

router.get('/', (req: Request, res: Response)=> {
  res.json(["espacio route"])
})

export { router }
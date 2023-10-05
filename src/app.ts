require('dotenv').config();
import express, { Response } from 'express';
import config from 'config';
import validateEnv from './utils/validateEnv';
import { PrismaClient } from '@prisma/client';

// import { ModuloService } from "./services/external/modulo.services"
// const docente = new ModuloService()
// const result = docente.getAll().then(
//   el => {
//     console.log(el)
//   }
// )

import routes from './routes'

// validateEnv();

const prisma = new PrismaClient();
const app = express();
app.use(express.json())

app.use('/api',routes)

async function bootstrap() {
  // Testing
  app.get('/api/healthchecker', async (_, res: Response) => {
    res.status(200).json({
      status: 'success',
      message: 'server running ✅',
    });
  });

  const port = config.get<number>('port');
  app.listen(port, () => {
    console.log(`Server on port: ${port}`);
  });
}

bootstrap()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

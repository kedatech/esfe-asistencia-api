/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Criterio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Espacio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[letra]` on the table `Nomenclatura` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Asistencia" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "CicloClase" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Clase" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Dia" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Duracion" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Espacio" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Criterio_nombre_key" ON "Criterio"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Espacio_name_key" ON "Espacio"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Nomenclatura_letra_key" ON "Nomenclatura"("letra");

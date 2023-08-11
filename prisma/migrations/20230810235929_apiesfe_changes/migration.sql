/*
  Warnings:

  - You are about to drop the `Ciclo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Docente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Estudiante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Grupo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Modulo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Turno` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cicloId,espacioId,duracionId,diaId,docenteId,grupoId,moduloId]` on the table `Clase` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Dia` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[startTime,endTime]` on the table `Duracion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Espacio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rol` to the `Huella` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EspacioType" AS ENUM ('labotario', 'aula');

-- CreateEnum
CREATE TYPE "roles" AS ENUM ('Estudiante', 'Docente');

-- DropForeignKey
ALTER TABLE "Asistencia" DROP CONSTRAINT "Asistencia_estudianteId_fkey";

-- DropForeignKey
ALTER TABLE "Docente" DROP CONSTRAINT "Docente_HuellaId_fkey";

-- DropForeignKey
ALTER TABLE "Estudiante" DROP CONSTRAINT "Estudiante_grupoId_fkey";

-- DropForeignKey
ALTER TABLE "Estudiante" DROP CONSTRAINT "Estudiante_huellaId_fkey";

-- DropForeignKey
ALTER TABLE "Grupo" DROP CONSTRAINT "Grupo_TurnoId_fkey";

-- AlterTable
ALTER TABLE "Espacio" ADD COLUMN     "type" "EspacioType" NOT NULL;

-- AlterTable
ALTER TABLE "Huella" ADD COLUMN     "docenteId" INTEGER,
ADD COLUMN     "estudianteId" INTEGER,
ADD COLUMN     "rol" "roles" NOT NULL;

-- DropTable
DROP TABLE "Ciclo";

-- DropTable
DROP TABLE "Docente";

-- DropTable
DROP TABLE "Estudiante";

-- DropTable
DROP TABLE "Grupo";

-- DropTable
DROP TABLE "Modulo";

-- DropTable
DROP TABLE "Turno";

-- CreateTable
CREATE TABLE "CicloClase" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CicloClase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CicloClase_name_key" ON "CicloClase"("name");

-- CreateIndex
CREATE INDEX "Clase_cicloId_espacioId_duracionId_diaId_docenteId_grupoId__idx" ON "Clase"("cicloId", "espacioId", "duracionId", "diaId", "docenteId", "grupoId", "moduloId");

-- CreateIndex
CREATE UNIQUE INDEX "Clase_cicloId_espacioId_duracionId_diaId_docenteId_grupoId__key" ON "Clase"("cicloId", "espacioId", "duracionId", "diaId", "docenteId", "grupoId", "moduloId");

-- CreateIndex
CREATE UNIQUE INDEX "Dia_name_key" ON "Dia"("name");

-- CreateIndex
CREATE INDEX "Duracion_startTime_endTime_idx" ON "Duracion"("startTime", "endTime");

-- CreateIndex
CREATE UNIQUE INDEX "Duracion_startTime_endTime_key" ON "Duracion"("startTime", "endTime");

-- AddForeignKey
ALTER TABLE "Clase" ADD CONSTRAINT "Clase_cicloId_fkey" FOREIGN KEY ("cicloId") REFERENCES "CicloClase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clase" ADD CONSTRAINT "Clase_espacioId_fkey" FOREIGN KEY ("espacioId") REFERENCES "Espacio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clase" ADD CONSTRAINT "Clase_duracionId_fkey" FOREIGN KEY ("duracionId") REFERENCES "Duracion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clase" ADD CONSTRAINT "Clase_diaId_fkey" FOREIGN KEY ("diaId") REFERENCES "Dia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

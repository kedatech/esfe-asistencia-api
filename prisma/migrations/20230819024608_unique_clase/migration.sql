/*
  Warnings:

  - A unique constraint covering the columns `[cicloId,espacioId,duracionId,diaId]` on the table `Clase` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Clase_cicloId_espacioId_duracionId_diaId_idx" ON "Clase"("cicloId", "espacioId", "duracionId", "diaId");

-- CreateIndex
CREATE UNIQUE INDEX "Clase_cicloId_espacioId_duracionId_diaId_key" ON "Clase"("cicloId", "espacioId", "duracionId", "diaId");

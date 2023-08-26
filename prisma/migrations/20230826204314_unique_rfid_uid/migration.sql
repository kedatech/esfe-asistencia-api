/*
  Warnings:

  - A unique constraint covering the columns `[estudianteId,uid]` on the table `Rfid` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Rfid_estudianteId_id_idx" ON "Rfid"("estudianteId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Rfid_estudianteId_uid_key" ON "Rfid"("estudianteId", "uid");

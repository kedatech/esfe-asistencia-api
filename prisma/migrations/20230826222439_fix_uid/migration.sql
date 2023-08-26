/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `Rfid` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Rfid_uid_key" ON "Rfid"("uid");

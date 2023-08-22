/*
  Warnings:

  - You are about to drop the `Huella` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rol` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Huella" DROP CONSTRAINT "Huella_rolId_fkey";

-- DropTable
DROP TABLE "Huella";

-- DropTable
DROP TABLE "Rol";

-- CreateTable
CREATE TABLE "Rfid" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "estudianteId" INTEGER NOT NULL,

    CONSTRAINT "Rfid_pkey" PRIMARY KEY ("id")
);

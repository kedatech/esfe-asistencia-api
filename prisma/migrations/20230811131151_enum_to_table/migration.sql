/*
  Warnings:

  - You are about to drop the column `type` on the `Espacio` table. All the data in the column will be lost.
  - You are about to drop the column `rol` on the `Huella` table. All the data in the column will be lost.
  - Added the required column `espacioTypeId` to the `Espacio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rolId` to the `Huella` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Espacio" DROP COLUMN "type",
ADD COLUMN     "espacioTypeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Huella" DROP COLUMN "rol",
ADD COLUMN     "rolId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "EspacioType";

-- DropEnum
DROP TYPE "roles";

-- CreateTable
CREATE TABLE "EspacioType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EspacioType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EspacioType_name_key" ON "EspacioType"("name");

-- AddForeignKey
ALTER TABLE "Espacio" ADD CONSTRAINT "Espacio_espacioTypeId_fkey" FOREIGN KEY ("espacioTypeId") REFERENCES "EspacioType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Huella" ADD CONSTRAINT "Huella_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

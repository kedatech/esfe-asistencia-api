-- DropForeignKey
ALTER TABLE "Asistencia" DROP CONSTRAINT "Asistencia_nomenclaturaId_fkey";

-- AlterTable
ALTER TABLE "Asistencia" ALTER COLUMN "nomenclaturaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_nomenclaturaId_fkey" FOREIGN KEY ("nomenclaturaId") REFERENCES "Nomenclatura"("id") ON DELETE SET NULL ON UPDATE CASCADE;

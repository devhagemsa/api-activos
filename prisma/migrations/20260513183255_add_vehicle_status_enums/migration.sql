/*
  Warnings:

  - You are about to drop the column `estadoUnidad` on the `vehiculos_detalle` table. All the data in the column will be lost.
  - The `estadoCalibracion` column on the `vehiculos_detalle` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EstadoOperativo" AS ENUM ('DISPONIBLE', 'ASIGNADO', 'EN_RUTA', 'EN_MANTENIMIENTO', 'BLOQUEADO');

-- CreateEnum
CREATE TYPE "EstadoCalibracion" AS ENUM ('CALIBRADA', 'NO_CALIBRADA', 'PENDIENTE', 'OBSERVADA');

-- AlterTable
ALTER TABLE "vehiculos_detalle" DROP COLUMN "estadoUnidad",
ADD COLUMN     "estadoOperativo" "EstadoOperativo" NOT NULL DEFAULT 'DISPONIBLE',
DROP COLUMN "estadoCalibracion",
ADD COLUMN     "estadoCalibracion" "EstadoCalibracion" NOT NULL DEFAULT 'PENDIENTE';

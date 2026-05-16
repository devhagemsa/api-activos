CREATE TYPE "TipoImagenActivo" AS ENUM (
  'FRONTAL',
  'LATERAL',
  'POSTERIOR',
  'INTERIOR',
  'DOCUMENTO',
  'OTRO'
);

CREATE TYPE "EstadoEquipamientoActivo" AS ENUM (
  'INSTALADO',
  'PENDIENTE',
  'OBSERVADO',
  'RETIRADO',
  'NO_APLICA'
);

CREATE TABLE "imagenes_activo" (
  "id" TEXT NOT NULL,
  "activoId" TEXT NOT NULL,
  "tipoImagen" "TipoImagenActivo" NOT NULL DEFAULT 'OTRO',
  "url" TEXT NOT NULL,
  "descripcion" TEXT,
  "orden" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "imagenes_activo_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "equipamiento_activo" (
  "id" TEXT NOT NULL,
  "activoId" TEXT NOT NULL,
  "nombre" TEXT NOT NULL,
  "estado" "EstadoEquipamientoActivo" NOT NULL DEFAULT 'PENDIENTE',
  "descripcion" TEXT,
  "observacion" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "equipamiento_activo_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "imagenes_activo_activoId_tipoImagen_idx"
  ON "imagenes_activo"("activoId", "tipoImagen");

CREATE INDEX "equipamiento_activo_activoId_nombre_idx"
  ON "equipamiento_activo"("activoId", "nombre");

CREATE UNIQUE INDEX "vehiculos_detalle_placaRodaje_key"
  ON "vehiculos_detalle"("placaRodaje");

CREATE UNIQUE INDEX "vehiculos_detalle_serieChasis_key"
  ON "vehiculos_detalle"("serieChasis");

CREATE UNIQUE INDEX "vehiculos_detalle_serieMotor_key"
  ON "vehiculos_detalle"("serieMotor");

ALTER TABLE "imagenes_activo"
  ADD CONSTRAINT "imagenes_activo_activoId_fkey"
  FOREIGN KEY ("activoId") REFERENCES "activos"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "equipamiento_activo"
  ADD CONSTRAINT "equipamiento_activo_activoId_fkey"
  FOREIGN KEY ("activoId") REFERENCES "activos"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

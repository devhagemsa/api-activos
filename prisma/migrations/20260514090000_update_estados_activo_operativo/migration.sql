-- Update EstadoActivo from ACTIVO/INACTIVO/RETIRADO/BAJA
-- to ACTIVO/INACTIVO/SINIESTRADO.
ALTER TABLE "activos" ALTER COLUMN "estadoActivo" DROP DEFAULT;

CREATE TYPE "EstadoActivo_new" AS ENUM ('ACTIVO', 'INACTIVO', 'SINIESTRADO');

ALTER TABLE "activos"
ALTER COLUMN "estadoActivo" TYPE "EstadoActivo_new"
USING (
  CASE
    WHEN "estadoActivo"::text IN ('RETIRADO', 'BAJA') THEN 'SINIESTRADO'
    ELSE "estadoActivo"::text
  END
)::"EstadoActivo_new";

DROP TYPE "EstadoActivo";
ALTER TYPE "EstadoActivo_new" RENAME TO "EstadoActivo";

ALTER TABLE "activos" ALTER COLUMN "estadoActivo" SET DEFAULT 'ACTIVO';

-- Update EstadoOperativo from DISPONIBLE/ASIGNADO/EN_RUTA/EN_MANTENIMIENTO/BLOQUEADO
-- to OPERATIVO/MANTENIMIENTO/NO_OPERATIVO.
ALTER TABLE "vehiculos_detalle" ALTER COLUMN "estadoOperativo" DROP DEFAULT;

CREATE TYPE "EstadoOperativo_new" AS ENUM ('OPERATIVO', 'MANTENIMIENTO', 'NO_OPERATIVO');

ALTER TABLE "vehiculos_detalle"
ALTER COLUMN "estadoOperativo" TYPE "EstadoOperativo_new"
USING (
  CASE
    WHEN "estadoOperativo"::text IN ('DISPONIBLE', 'ASIGNADO', 'EN_RUTA') THEN 'OPERATIVO'
    WHEN "estadoOperativo"::text = 'EN_MANTENIMIENTO' THEN 'MANTENIMIENTO'
    WHEN "estadoOperativo"::text = 'BLOQUEADO' THEN 'NO_OPERATIVO'
    ELSE "estadoOperativo"::text
  END
)::"EstadoOperativo_new";

DROP TYPE "EstadoOperativo";
ALTER TYPE "EstadoOperativo_new" RENAME TO "EstadoOperativo";

ALTER TABLE "vehiculos_detalle" ALTER COLUMN "estadoOperativo" SET DEFAULT 'OPERATIVO';

-- CreateEnum
CREATE TYPE "TipoDocumentoActivo" AS ENUM ('TARJETA_PROPIEDAD', 'TARJETA_MERCANCIAS', 'SOAT', 'REVISION_TECNICA_12_MESES', 'REVISION_TECNICA_6_MESES', 'RESOLUCION_DIRECTORAL', 'RESOLUCION_GERENCIAL', 'IQBF', 'CERTIFICADO_MATPEL', 'CERTIFICADO_BONIFICACION', 'CERTIFICADO_OPERATIVIDAD', 'OTRO');

-- CreateEnum
CREATE TYPE "EstadoDocumentoActivo" AS ENUM ('VIGENTE', 'VENCIDO', 'PENDIENTE', 'OBSERVADO', 'NO_APLICA');

-- CreateTable
CREATE TABLE "documentos_activo" (
    "id" TEXT NOT NULL,
    "activoId" TEXT NOT NULL,
    "tipoDocumento" "TipoDocumentoActivo" NOT NULL,
    "estadoDocumento" "EstadoDocumentoActivo" NOT NULL DEFAULT 'PENDIENTE',
    "numero" TEXT,
    "fechaEmision" TIMESTAMP(3),
    "fechaVencimiento" TIMESTAMP(3),
    "archivoUrl" TEXT,
    "observacion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documentos_activo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "documentos_activo_activoId_tipoDocumento_idx" ON "documentos_activo"("activoId", "tipoDocumento");

-- AddForeignKey
ALTER TABLE "documentos_activo" ADD CONSTRAINT "documentos_activo_activoId_fkey" FOREIGN KEY ("activoId") REFERENCES "activos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

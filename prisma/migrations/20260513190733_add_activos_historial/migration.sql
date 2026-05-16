-- CreateTable
CREATE TABLE "activos_historial" (
    "id" TEXT NOT NULL,
    "activoId" TEXT NOT NULL,
    "tipoCambio" TEXT NOT NULL,
    "valorAnterior" TEXT,
    "valorNuevo" TEXT,
    "motivo" TEXT,
    "usuario" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activos_historial_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activos_historial" ADD CONSTRAINT "activos_historial_activoId_fkey" FOREIGN KEY ("activoId") REFERENCES "activos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

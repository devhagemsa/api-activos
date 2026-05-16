-- CreateEnum
CREATE TYPE "TipoActivo" AS ENUM ('VEHICULO', 'EQUIPO', 'HERRAMIENTA', 'DISPOSITIVO', 'OTRO');

-- CreateEnum
CREATE TYPE "EstadoActivo" AS ENUM ('ACTIVO', 'INACTIVO', 'RETIRADO', 'BAJA');

-- CreateEnum
CREATE TYPE "PlantillaInventario" AS ENUM ('CAMION', 'REMOLCADOR', 'SEMIREMOLQUE', 'EQUIPO_LIVIANO');

-- CreateTable
CREATE TABLE "activos" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "tipoActivo" "TipoActivo" NOT NULL,
    "descripcion" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "estado" "EstadoActivo" NOT NULL DEFAULT 'ACTIVO',
    "observacion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehiculos_detalle" (
    "id" TEXT NOT NULL,
    "activoId" TEXT NOT NULL,
    "plantillaInventario" "PlantillaInventario" NOT NULL,
    "tarjetaPropiedad" TEXT,
    "tarjetaMercancias" TEXT,
    "soat" TEXT,
    "revisionTecnica12Meses" TEXT,
    "revisionTecnica6Meses" TEXT,
    "resolucionDirectoral" TEXT,
    "resolucionGerencial" TEXT,
    "iqbf" TEXT,
    "certificadoMatpel" TEXT,
    "certificadoBonificacion" TEXT,
    "certificadoOperatividad" TEXT,
    "placaRodaje" TEXT,
    "anioFabricacion" INTEGER,
    "color" TEXT,
    "marca" TEXT,
    "modelo" TEXT,
    "carroceria" TEXT,
    "categoria" TEXT,
    "serieChasis" TEXT,
    "serieMotor" TEXT,
    "radioComunicacion" TEXT,
    "autorradio" TEXT,
    "llantasRepuesto" TEXT,
    "camara" TEXT,
    "tablet" TEXT,
    "dispositivosSeguridad" TEXT,
    "estadoUnidad" TEXT,
    "cajaHerramientas" TEXT,
    "jaulaAntivuelco" TEXT,
    "carriboy" TEXT,
    "baranda" TEXT,
    "mamparon" TEXT,
    "ancho" DECIMAL(65,30),
    "longitud" DECIMAL(65,30),
    "alto" DECIMAL(65,30),
    "tipoSuspension" TEXT,
    "tipoTornamesa" TEXT,
    "capacidadTanqueGalones" DECIMAL(65,30),
    "estadoCalibracion" TEXT,
    "factorCorreccion" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehiculos_detalle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "activos_codigo_key" ON "activos"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "vehiculos_detalle_activoId_key" ON "vehiculos_detalle"("activoId");

-- AddForeignKey
ALTER TABLE "vehiculos_detalle" ADD CONSTRAINT "vehiculos_detalle_activoId_fkey" FOREIGN KEY ("activoId") REFERENCES "activos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

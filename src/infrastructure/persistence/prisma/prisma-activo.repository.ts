import { Injectable } from '@nestjs/common';
import {
  EstadoActivo,
  Activo,
  EstadoCalibracion,
  EstadoOperativo,
  PlantillaInventario,
  TipoActivo,
  VehiculoDetalleProps,
} from '../../../domain/aggregates/activo.aggregate';
import {
  ActivoFilters,
  ActivoRepository,
} from '../../../domain/repositories/activo.repository';
import { PrismaService } from './prisma.service';

type ActivoConVehiculo = Awaited<
  ReturnType<PrismaActivoRepository['findActivoRecordById']>
>;

@Injectable()
export class PrismaActivoRepository implements ActivoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(activo: Activo): Promise<Activo> {
    const data = activo.toPrimitives();
    const { vehiculo, ...activoData } = data;
    const vehiculoData = vehiculo ? this.toPrismaVehiculo(vehiculo) : null;

    const saved = await this.prisma.activo.upsert({
      where: { id: activoData.id },
      create: {
        ...activoData,
        vehiculoDetalle: vehiculoData
          ? {
              create: vehiculoData,
            }
          : undefined,
      },
      update: {
        codigo: activoData.codigo,
        tipoActivo: activoData.tipoActivo,
        descripcion: activoData.descripcion,
        ubicacion: activoData.ubicacion,
        estadoActivo: activoData.estadoActivo,
        observacion: activoData.observacion,
        vehiculoDetalle: vehiculoData
          ? {
              upsert: {
                create: vehiculoData,
                update: vehiculoData,
              },
            }
          : undefined,
      },
      include: { vehiculoDetalle: true },
    });

    return this.toDomain(saved);
  }

  private toPrismaVehiculo(vehiculo: VehiculoDetalleProps) {
    return {
      ...vehiculo,
      estadoOperativo: vehiculo.estadoOperativo ?? undefined,
      estadoCalibracion: vehiculo.estadoCalibracion ?? undefined,
    };
  }

  async findAll(filters?: ActivoFilters): Promise<Activo[]> {
    const activos = await this.prisma.activo.findMany({
      where: {
        codigo: filters?.codigo
          ? {
              contains: filters.codigo.trim().toUpperCase(),
              mode: 'insensitive',
            }
          : undefined,
        tipoActivo: filters?.tipoActivo,
        estadoActivo: filters?.estadoActivo,
        vehiculoDetalle:
          filters?.placa ||
          filters?.plantillaInventario ||
          filters?.estadoOperativo ||
          filters?.estadoCalibracion
            ? {
                placaRodaje: filters.placa
                  ? {
                      contains: filters.placa.trim().toUpperCase(),
                      mode: 'insensitive',
                    }
                  : undefined,
                plantillaInventario: filters.plantillaInventario,
                estadoOperativo: filters.estadoOperativo,
                estadoCalibracion: filters.estadoCalibracion,
              }
            : undefined,
      },
      include: { vehiculoDetalle: true },
      orderBy: { createdAt: 'desc' },
    });

    return activos.map((activo) => this.toDomain(activo));
  }

  async findById(id: string): Promise<Activo | null> {
    const activo = await this.findActivoRecordById(id);
    return activo ? this.toDomain(activo) : null;
  }

  async findByCodigo(codigo: string): Promise<Activo | null> {
    const activo = await this.prisma.activo.findUnique({
      where: { codigo: codigo.trim().toUpperCase() },
      include: { vehiculoDetalle: true },
    });

    return activo ? this.toDomain(activo) : null;
  }

  async findByPlaca(placa: string): Promise<Activo | null> {
    const activo = await this.prisma.activo.findFirst({
      where: {
        vehiculoDetalle: {
          placaRodaje: placa.trim().toUpperCase(),
        },
      },
      include: { vehiculoDetalle: true },
    });

    return activo ? this.toDomain(activo) : null;
  }

  private findActivoRecordById(id: string) {
    return this.prisma.activo.findUnique({
      where: { id },
      include: { vehiculoDetalle: true },
    });
  }

  private toDomain(record: NonNullable<ActivoConVehiculo>) {
    const { vehiculoDetalle, ...activo } = record;

    return Activo.rehidratar({
      ...activo,
      tipoActivo: activo.tipoActivo as TipoActivo,
      estadoActivo: activo.estadoActivo as EstadoActivo,
      vehiculo: vehiculoDetalle
        ? {
            plantillaInventario:
              vehiculoDetalle.plantillaInventario as PlantillaInventario,
            tarjetaPropiedad: vehiculoDetalle.tarjetaPropiedad,
            tarjetaMercancias: vehiculoDetalle.tarjetaMercancias,
            soat: vehiculoDetalle.soat,
            revisionTecnica12Meses: vehiculoDetalle.revisionTecnica12Meses,
            revisionTecnica6Meses: vehiculoDetalle.revisionTecnica6Meses,
            resolucionDirectoral: vehiculoDetalle.resolucionDirectoral,
            resolucionGerencial: vehiculoDetalle.resolucionGerencial,
            iqbf: vehiculoDetalle.iqbf,
            certificadoMatpel: vehiculoDetalle.certificadoMatpel,
            certificadoBonificacion: vehiculoDetalle.certificadoBonificacion,
            certificadoOperatividad: vehiculoDetalle.certificadoOperatividad,
            placaRodaje: vehiculoDetalle.placaRodaje,
            anioFabricacion: vehiculoDetalle.anioFabricacion,
            color: vehiculoDetalle.color,
            marca: vehiculoDetalle.marca,
            modelo: vehiculoDetalle.modelo,
            carroceria: vehiculoDetalle.carroceria,
            ejes: vehiculoDetalle.ejes,
            categoria: vehiculoDetalle.categoria,
            serieChasis: vehiculoDetalle.serieChasis,
            serieMotor: vehiculoDetalle.serieMotor,
            radioComunicacion: vehiculoDetalle.radioComunicacion,
            autorradio: vehiculoDetalle.autorradio,
            llantasRepuesto: vehiculoDetalle.llantasRepuesto,
            camara: vehiculoDetalle.camara,
            tablet: vehiculoDetalle.tablet,
            dispositivosSeguridad: vehiculoDetalle.dispositivosSeguridad,
            estadoOperativo:
              vehiculoDetalle.estadoOperativo as EstadoOperativo,
            cajaHerramientas: vehiculoDetalle.cajaHerramientas,
            jaulaAntivuelco: vehiculoDetalle.jaulaAntivuelco,
            carriboy: vehiculoDetalle.carriboy,
            baranda: vehiculoDetalle.baranda,
            mamparon: vehiculoDetalle.mamparon,
            ancho: vehiculoDetalle.ancho?.toNumber() ?? null,
            longitud: vehiculoDetalle.longitud?.toNumber() ?? null,
            alto: vehiculoDetalle.alto?.toNumber() ?? null,
            tipoSuspension: vehiculoDetalle.tipoSuspension,
            tipoTornamesa: vehiculoDetalle.tipoTornamesa,
            capacidadTanqueGalones:
              vehiculoDetalle.capacidadTanqueGalones?.toNumber() ?? null,
            estadoCalibracion:
              vehiculoDetalle.estadoCalibracion as EstadoCalibracion,
            factorCorreccion:
              vehiculoDetalle.factorCorreccion?.toNumber() ?? null,
          }
        : null,
    });
  }
}

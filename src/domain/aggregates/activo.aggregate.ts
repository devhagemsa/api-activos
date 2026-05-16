import { randomUUID } from 'node:crypto';

export enum TipoActivo {
  VEHICULO = 'VEHICULO',
  EQUIPO = 'EQUIPO',
  HERRAMIENTA = 'HERRAMIENTA',
  DISPOSITIVO = 'DISPOSITIVO',
  OTRO = 'OTRO',
}

export enum EstadoActivo {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
  SINIESTRADO = 'SINIESTRADO',
}

export enum PlantillaInventario {
  CAMION = 'CAMION',
  REMOLCADOR = 'REMOLCADOR',
  SEMIREMOLQUE = 'SEMIREMOLQUE',
  EQUIPO_LIVIANO = 'EQUIPO_LIVIANO',
}

export enum EstadoOperativo {
  OPERATIVO = 'OPERATIVO',
  MANTENIMIENTO = 'MANTENIMIENTO',
  NO_OPERATIVO = 'NO_OPERATIVO',
}

export enum EstadoCalibracion {
  CALIBRADA = 'CALIBRADA',
  NO_CALIBRADA = 'NO_CALIBRADA',
  PENDIENTE = 'PENDIENTE',
  OBSERVADA = 'OBSERVADA',
}

export type VehiculoDetalleProps = {
  plantillaInventario: PlantillaInventario;
  tarjetaPropiedad?: string | null;
  tarjetaMercancias?: string | null;
  soat?: string | null;
  revisionTecnica12Meses?: string | null;
  revisionTecnica6Meses?: string | null;
  resolucionDirectoral?: string | null;
  resolucionGerencial?: string | null;
  iqbf?: string | null;
  certificadoMatpel?: string | null;
  certificadoBonificacion?: string | null;
  certificadoOperatividad?: string | null;
  placaRodaje?: string | null;
  anioFabricacion?: number | null;
  color?: string | null;
  marca?: string | null;
  modelo?: string | null;
  carroceria?: string | null;
  ejes?: number | null;
  categoria?: string | null;
  serieChasis?: string | null;
  serieMotor?: string | null;
  radioComunicacion?: string | null;
  autorradio?: string | null;
  llantasRepuesto?: string | null;
  camara?: string | null;
  tablet?: string | null;
  dispositivosSeguridad?: string | null;
  estadoOperativo?: EstadoOperativo | null;
  cajaHerramientas?: string | null;
  jaulaAntivuelco?: string | null;
  carriboy?: string | null;
  baranda?: string | null;
  mamparon?: string | null;
  ancho?: number | null;
  longitud?: number | null;
  alto?: number | null;
  tipoSuspension?: string | null;
  tipoTornamesa?: string | null;
  capacidadTanqueGalones?: number | null;
  estadoCalibracion?: EstadoCalibracion | null;
  factorCorreccion?: number | null;
};

export type ActivoProps = {
  id?: string;
  codigo: string;
  tipoActivo: TipoActivo;
  descripcion: string;
  ubicacion: string;
  estadoActivo: EstadoActivo;
  observacion?: string | null;
  vehiculo?: VehiculoDetalleProps | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Activo {
  private constructor(
    private readonly props: Required<Omit<ActivoProps, 'vehiculo'>> & {
      vehiculo: VehiculoDetalleProps | null;
    },
  ) {}

  static crear(props: Omit<ActivoProps, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date();

    return new Activo({
      ...props,
      id: randomUUID(),
      codigo: props.codigo.trim().toUpperCase(),
      descripcion: props.descripcion.trim(),
      ubicacion: props.ubicacion.trim(),
      observacion: props.observacion?.trim() || null,
      vehiculo: props.vehiculo ?? null,
      createdAt: now,
      updatedAt: now,
    });
  }

  static rehidratar(props: ActivoProps) {
    return new Activo({
      ...props,
      codigo: props.codigo.trim().toUpperCase(),
      observacion: props.observacion ?? null,
      vehiculo: props.vehiculo ?? null,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    });
  }

  actualizar(
    props: Partial<
      Pick<
        ActivoProps,
        | 'descripcion'
        | 'ubicacion'
        | 'estadoActivo'
        | 'observacion'
        | 'tipoActivo'
        | 'vehiculo'
      >
    >,
  ) {
    return Activo.rehidratar({
      ...this.props,
      ...props,
      descripcion: props.descripcion?.trim() ?? this.props.descripcion,
      ubicacion: props.ubicacion?.trim() ?? this.props.ubicacion,
      observacion:
        props.observacion === undefined
          ? this.props.observacion
          : props.observacion?.trim() || null,
      vehiculo:
        props.vehiculo === undefined ? this.props.vehiculo : props.vehiculo,
      updatedAt: new Date(),
    });
  }

  retirar(observacion?: string) {
    return this.actualizar({
      estadoActivo: EstadoActivo.SINIESTRADO,
      observacion: observacion ?? this.props.observacion,
    });
  }

  toPrimitives() {
    return { ...this.props };
  }
}

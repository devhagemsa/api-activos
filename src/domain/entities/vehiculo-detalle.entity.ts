import {
  EstadoCalibracion,
  EstadoOperativo,
  PlantillaInventario,
  VehiculoDetalleProps,
} from '../aggregates/activo.aggregate';

export class VehiculoDetalle {
  constructor(private readonly props: VehiculoDetalleProps) {}

  get plantillaInventario(): PlantillaInventario {
    return this.props.plantillaInventario;
  }

  get estadoOperativo(): EstadoOperativo | null | undefined {
    return this.props.estadoOperativo;
  }

  get estadoCalibracion(): EstadoCalibracion | null | undefined {
    return this.props.estadoCalibracion;
  }

  toPrimitives() {
    return { ...this.props };
  }
}

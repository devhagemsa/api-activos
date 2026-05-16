export enum EstadoEquipamientoActivo {
  INSTALADO = 'INSTALADO',
  PENDIENTE = 'PENDIENTE',
  OBSERVADO = 'OBSERVADO',
  RETIRADO = 'RETIRADO',
  NO_APLICA = 'NO_APLICA',
}

export type EquipamientoActivoProps = {
  id: string;
  activoId: string;
  nombre: string;
  estado: EstadoEquipamientoActivo;
  descripcion?: string | null;
  observacion?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export class EquipamientoActivo {
  constructor(private readonly props: EquipamientoActivoProps) {}

  toPrimitives() {
    return { ...this.props };
  }
}

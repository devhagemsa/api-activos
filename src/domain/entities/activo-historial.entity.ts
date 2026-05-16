export type ActivoHistorialProps = {
  id: string;
  activoId: string;
  tipoCambio: string;
  valorAnterior?: string | null;
  valorNuevo?: string | null;
  motivo?: string | null;
  usuario?: string | null;
  createdAt: Date;
};

export class ActivoHistorial {
  constructor(private readonly props: ActivoHistorialProps) {}

  toPrimitives() {
    return { ...this.props };
  }
}

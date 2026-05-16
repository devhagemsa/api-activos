import { EstadoCalibracion } from '../aggregates/activo.aggregate';

export class EstadoCalibracionCambiadoEvent {
  readonly eventName = 'EstadoCalibracionCambiado';

  constructor(
    readonly activoId: string,
    readonly codigo: string,
    readonly estadoAnterior: EstadoCalibracion | null | undefined,
    readonly estadoNuevo: EstadoCalibracion,
    readonly occurredAt = new Date(),
  ) {}
}

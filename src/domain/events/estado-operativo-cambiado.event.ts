import { EstadoOperativo } from '../aggregates/activo.aggregate';

export class EstadoOperativoCambiadoEvent {
  readonly eventName = 'EstadoOperativoCambiado';

  constructor(
    readonly activoId: string,
    readonly codigo: string,
    readonly estadoAnterior: EstadoOperativo | null | undefined,
    readonly estadoNuevo: EstadoOperativo,
    readonly occurredAt = new Date(),
  ) {}
}

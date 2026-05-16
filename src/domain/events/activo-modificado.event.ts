export class ActivoModificadoEvent {
  readonly eventName = 'ActivoModificado';

  constructor(
    readonly activoId: string,
    readonly codigo: string,
    readonly occurredAt = new Date(),
  ) {}
}

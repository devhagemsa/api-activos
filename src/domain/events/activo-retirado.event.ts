export class ActivoRetiradoEvent {
  readonly eventName = 'ActivoRetirado';

  constructor(
    readonly activoId: string,
    readonly codigo: string,
    readonly occurredAt = new Date(),
  ) {}
}

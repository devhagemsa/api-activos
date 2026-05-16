export class ActivoRegistradoEvent {
  readonly eventName = 'ActivoRegistrado';

  constructor(
    readonly activoId: string,
    readonly codigo: string,
    readonly occurredAt = new Date(),
  ) {}
}

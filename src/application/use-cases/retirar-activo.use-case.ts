import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EstadoOperativo } from '../../domain/aggregates/activo.aggregate';
import { ActivoRetiradoEvent } from '../../domain/events/activo-retirado.event';
import { DOMAIN_EVENT_PUBLISHER } from '../ports/domain-event-publisher.port';
import type { DomainEventPublisher } from '../ports/domain-event-publisher.port';
import { ACTIVO_REPOSITORY } from '../../domain/repositories/activo.repository';
import type { ActivoRepository } from '../../domain/repositories/activo.repository';

@Injectable()
export class RetirarActivoUseCase {
  constructor(
    @Inject(ACTIVO_REPOSITORY)
    private readonly activoRepository: ActivoRepository,
    @Inject(DOMAIN_EVENT_PUBLISHER)
    private readonly eventPublisher: DomainEventPublisher,
  ) {}

  async execute(id: string, observacion?: string) {
    const activo = await this.activoRepository.findById(id);

    if (!activo) {
      throw new NotFoundException(`Activo ${id} no encontrado`);
    }

    const data = activo.toPrimitives();

    if (data.vehiculo?.estadoOperativo === EstadoOperativo.MANTENIMIENTO) {
      throw new BadRequestException(
        'No se puede siniestrar un activo en mantenimiento',
      );
    }

    const saved = await this.activoRepository.save(activo.retirar(observacion));
    const savedData = saved.toPrimitives();
    await this.eventPublisher.publish(
      new ActivoRetiradoEvent(savedData.id, savedData.codigo),
    );

    return saved;
  }
}

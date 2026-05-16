import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ActualizarActivoDto } from '../dto/actualizar-activo.dto';
import { ActivoModificadoEvent } from '../../domain/events/activo-modificado.event';
import { DOMAIN_EVENT_PUBLISHER } from '../ports/domain-event-publisher.port';
import type { DomainEventPublisher } from '../ports/domain-event-publisher.port';
import { ACTIVO_REPOSITORY } from '../../domain/repositories/activo.repository';
import type { ActivoRepository } from '../../domain/repositories/activo.repository';

@Injectable()
export class ActualizarActivoUseCase {
  constructor(
    @Inject(ACTIVO_REPOSITORY)
    private readonly activoRepository: ActivoRepository,
    @Inject(DOMAIN_EVENT_PUBLISHER)
    private readonly eventPublisher: DomainEventPublisher,
  ) {}

  async execute(id: string, dto: ActualizarActivoDto) {
    const activo = await this.activoRepository.findById(id);

    if (!activo) {
      throw new NotFoundException(`Activo ${id} no encontrado`);
    }

    const saved = await this.activoRepository.save(activo.actualizar(dto));
    const data = saved.toPrimitives();
    await this.eventPublisher.publish(
      new ActivoModificadoEvent(data.id, data.codigo),
    );

    return saved;
  }
}

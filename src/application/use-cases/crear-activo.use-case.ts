import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CrearActivoDto } from '../dto/crear-activo.dto';
import { Activo } from '../../domain/aggregates/activo.aggregate';
import { ActivoRegistradoEvent } from '../../domain/events/activo-registrado.event';
import { DOMAIN_EVENT_PUBLISHER } from '../ports/domain-event-publisher.port';
import type { DomainEventPublisher } from '../ports/domain-event-publisher.port';
import { ACTIVO_REPOSITORY } from '../../domain/repositories/activo.repository';
import type { ActivoRepository } from '../../domain/repositories/activo.repository';

@Injectable()
export class CrearActivoUseCase {
  constructor(
    @Inject(ACTIVO_REPOSITORY)
    private readonly activoRepository: ActivoRepository,
    @Inject(DOMAIN_EVENT_PUBLISHER)
    private readonly eventPublisher: DomainEventPublisher,
  ) {}

  async execute(dto: CrearActivoDto) {
    const codigo = dto.codigo.trim().toUpperCase();
    const activoExistente = await this.activoRepository.findByCodigo(codigo);

    if (activoExistente) {
      throw new ConflictException(`Ya existe un activo con codigo ${codigo}`);
    }

    const activo = Activo.crear({ ...dto, codigo });

    const saved = await this.activoRepository.save(activo);
    const data = saved.toPrimitives();
    await this.eventPublisher.publish(
      new ActivoRegistradoEvent(data.id, data.codigo),
    );

    return saved;
  }
}

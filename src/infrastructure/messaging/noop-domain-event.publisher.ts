import { Injectable } from '@nestjs/common';
import { DomainEventPublisher } from '../../application/ports/domain-event-publisher.port';

@Injectable()
export class NoopDomainEventPublisher implements DomainEventPublisher {
  async publish(_event: object): Promise<void> {}
}

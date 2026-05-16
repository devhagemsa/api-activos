export const DOMAIN_EVENT_PUBLISHER = Symbol('DOMAIN_EVENT_PUBLISHER');

export interface DomainEventPublisher {
  publish(event: object): Promise<void>;
}

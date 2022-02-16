import { DomainEvent } from '@shared/domain/bus/event/domainEvent';

export interface EventBus {
    publish(events: Array<DomainEvent>): Promise<void>;
}

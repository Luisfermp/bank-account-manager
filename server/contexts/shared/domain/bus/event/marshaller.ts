import { DomainEvent } from '@shared/domain/bus/event/domainEvent';

export interface Marshaller {
    marshall(event: DomainEvent): unknown;
}

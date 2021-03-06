import { DomainEvent } from '@shared/domain/bus/event/domainEvent';

export default abstract class AggregateRoot {
    #domainEvents: Array<DomainEvent>;

    constructor() {
        this.#domainEvents = [];
    }

    pullDomainEvents(): Array<DomainEvent> {
        return this.#domainEvents;
    }

    record(event: DomainEvent): void {
        this.#domainEvents.push(event);
    }

    abstract toPrimitives(): any;
}

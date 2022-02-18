import {
    DomainEventClass,
    DomainEvent
} from '@shared/domain/bus/event/domainEvent';
import { DomainEventSubscriber } from '@shared/domain/bus/event/domainEventSubscriber';

type Mapping = Map<string, DomainEventClass>;

export default class DomainEventMapping {
    private mapping: Mapping;

    constructor(mapping: DomainEventSubscriber<DomainEvent>[]) {
        this.mapping = mapping.reduce(
            DomainEventMapping.eventsExtractor(),
            new Map<string, DomainEventClass>()
        );
    }

    private static eventsExtractor() {
        return (
            map: Mapping,
            subscriber: DomainEventSubscriber<DomainEvent>
        ) => {
            subscriber
                .subscribedTo()
                .forEach(DomainEventMapping.eventNameExtractor(map));
            return map;
        };
    }

    private static eventNameExtractor(
        map: Mapping
    ): (domainEvent: DomainEventClass) => void {
        return (domainEvent) => {
            const eventName = domainEvent.EVENT_NAME;
            map.set(eventName, domainEvent);
        };
    }

    for(name: string): DomainEventClass {
        const domainEvent = this.mapping.get(name);

        if (!domainEvent) {
            throw new Error(
                `The Domain Event Class for ${name} doesn't exists or have no subscribers`
            );
        }

        return domainEvent;
    }
}

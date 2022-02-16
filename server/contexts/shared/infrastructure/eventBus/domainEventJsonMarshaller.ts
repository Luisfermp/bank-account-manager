import { DomainEvent } from '@shared/domain/bus/event/domainEvent';
import { Marshaller } from '@shared/domain/bus/event/marshaller';

type JsonApi = {
    data: {
        id: string;
        type: string;
        occurredOn: string;
        attributes: Record<string, unknown>;
        meta: Record<string, unknown>;
    };
};

export default class DomainEventJsonMarshaller implements Marshaller {
    // eslint-disable-next-line class-methods-use-this
    marshall(e: DomainEvent): JsonApi {
        return {
            data: {
                id: e.eventId,
                type: e.eventName,
                occurredOn: e.occurredOn.toISOString(),
                attributes: {
                    id: e.aggregateId,
                    ...(e.toPrimitives() as Record<string, unknown>)
                },
                meta: {}
            }
        };
    }
}

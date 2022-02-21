/* eslint-disable max-classes-per-file */
import InMemorySyncEventBus from '@shared/infrastructure/bus/event/inMemorySyncEventBus';
import { DomainEvent } from '@shared/domain/bus/event/domainEvent';
import IntegerMother from '@shared/__mothers__/integer.mother';
import { DomainEventSubscriber } from '@shared/domain/bus/event/domainEventSubscriber';

class DummyDomainEventMock extends DomainEvent {
    static EVENT_NAME = 'dummy:event';

    readonly id: number;

    constructor(id: number) {
        super(DummyDomainEventMock.EVENT_NAME, `${id}:dummy`);
        this.id = id;
    }

    // eslint-disable-next-line class-methods-use-this,  @typescript-eslint/no-explicit-any
    toPrimitives(): Record<string, any> {
        const { id } = this;
        return {
            id
        };
    }
}

class DummyDomainEventSubscriberMock implements DomainEventSubscriber<DummyDomainEventMock> {
    // eslint-disable-next-line class-methods-use-this,  @typescript-eslint/no-explicit-any
    subscribedTo(): any[] {
        return [DummyDomainEventMock];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function,class-methods-use-this
    async on(_: DummyDomainEventMock): Promise<void> {
    }
}

describe('inMemorySyncEventBus', () => {
    const eventBus: InMemorySyncEventBus = new InMemorySyncEventBus();

    it('the subscriber should be called when the event it is subscribed to, is published', async () => {
        expect.hasAssertions();
        const expectedEvent = new DummyDomainEventMock(IntegerMother.random()),
            subscriber = new DummyDomainEventSubscriberMock();
        subscriber.on = async (receivedEvent) => {
            expect(receivedEvent).toStrictEqual(expectedEvent);
        };

        eventBus.addSubscribers([subscriber]);

        await eventBus.publish([expectedEvent]);
    });
});

/* eslint-disable jest/no-standalone-expect */
/* eslint-disable class-methods-use-this */
import { EventBus } from '@shared/domain/bus/event/eventBus';
import { DomainEvent } from '@shared/domain/bus/event/domainEvent';
import { DomainEventSubscriber } from '@shared/domain/bus/event/domainEventSubscriber';

export default class EventBusMock implements EventBus {
    private publishSpy = jest.fn();

    async publish(events: DomainEvent[]): Promise<void> {
        this.publishSpy(events);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addSubscribers(_subscribers: DomainEventSubscriber<DomainEvent>[]): void {
        //
    }

    assertLastPublishedEventIs(expectedEvent: DomainEvent): void {
        const publishSpyCalls = this.publishSpy.mock.calls,
            lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1],
            lastPublishedEvent = lastPublishSpyCall[0][0];

        expect(publishSpyCalls.length).toBeGreaterThan(0);

        expect(this.getDataFromDomainEvent(expectedEvent)).toMatchObject(
            this.getDataFromDomainEvent(lastPublishedEvent)
        );
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    assertLastPublishedEventTypeIs(type: any): void {
        const publishSpyCalls = this.publishSpy.mock.calls;

        expect(publishSpyCalls.length).toBeGreaterThan(0);

        // eslint-disable-next-line one-var
        const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1],
            lastPublishedEvent = lastPublishSpyCall[0][0];

        expect(lastPublishedEvent).toBeInstanceOf(type);
    }

    assertLastPublishedEventsAre(events: DomainEvent[]): void {
        const publishSpyCalls = this.publishSpy.mock.calls,
            lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1],
            lastPublishedEvents = lastPublishSpyCall[0];

        expect(publishSpyCalls.length).toBeGreaterThan(0);
        expect(lastPublishedEvents).toHaveLength(events.length);

        lastPublishedEvents.forEach((publishedEvent: DomainEvent, i: number) => {
            const expectedEvent = events[i];

            expect(this.getDataFromDomainEvent(expectedEvent)).toMatchObject(
                this.getDataFromDomainEvent(publishedEvent)
            );
        });
    }

    assertPublishedEventsAre(events: DomainEvent[]): void {
        const { mock } = this.publishSpy,
            callsArgument = mock.calls.map((c) => this.getDataFromDomainEvent(c[0][0]));

        expect(mock.calls).toHaveLength(events.length);

        events.forEach((e) => {
            expect(callsArgument).toContainEqual(this.getDataFromDomainEvent(e));
        });
    }

    assertEmptyPublished(): void {
        const publishSpyCalls = this.publishSpy.mock.calls,
            lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1],
            lastPublishedEvents = lastPublishSpyCall[0];

        expect(lastPublishedEvents).toHaveLength(0);
    }

    assertNothingPublished(): void {
        const publishSpyCalls = this.publishSpy.mock.calls;

        expect(publishSpyCalls).toHaveLength(0);
    }

    private getDataFromDomainEvent(event: DomainEvent): any {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { eventId, occurredOn, ...attributes } = event;

        return attributes;
    }
}

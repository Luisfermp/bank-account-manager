import { DomainEvent } from '@shared/domain/bus/event/domainEvent';

type AccountBalanceUpdatedDomainEventBody = {
  id: string;
  balance: number;
  updatedAt: string;
  amount: number
}

export default class AccountBalanceUpdatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = 'comalatech.backoffice.1.event.account.balance.updated';

    readonly id: string;

    readonly balance: number;

    readonly updatedAt: string;

    readonly amount: number;

    constructor({
        id: accountId,
        balance,
        updatedAt,
        amount,
        eventId,
        occurredOn
    }: AccountBalanceUpdatedDomainEventBody & { eventId?: string; occurredOn?: Date }) {
        super(AccountBalanceUpdatedDomainEvent.EVENT_NAME, accountId, eventId, occurredOn);
        this.id = accountId;
        this.balance = balance;
        this.updatedAt = updatedAt;
        this.amount = amount;
    }

    toPrimitives(): unknown {
        const {
            amount, id, balance, updatedAt
        } = this;
        return {
            amount,
            id,
            balance,
            updatedAt
        };
    }
}

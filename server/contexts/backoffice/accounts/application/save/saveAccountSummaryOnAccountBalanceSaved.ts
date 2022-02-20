import DatetimeValueObject from '@shared/domain/datetimeValueObject';
import AccountBalanceUpdatedDomainEvent from '@backoffice/accounts/domain/accountBalanceUpdated';
import AccountBalanceCreatedDomainEvent from '@backoffice/accounts/domain/accountBalanceCreated';
import { DomainEvent, DomainEventClass } from '@shared/domain/bus/event/domainEvent';
import { DomainEventSubscriber } from '@shared/domain/bus/event/domainEventSubscriber';
import AccountSummarySaver from '@backoffice/accounts/application/save/accountSummarySaver';
import AccountId from '@backoffice/accounts/domain/accountId';
import Amount from '@backoffice/accounts/domain/amount';
import Balance from '@backoffice/accounts/domain/balance';

export default class SaveAccountSummaryOnAccountBalanceSaved implements DomainEventSubscriber<DomainEvent> {
    #saver: AccountSummarySaver;

    constructor(saver: AccountSummarySaver) {
        this.#saver = saver;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): DomainEventClass[] {
        return [
            AccountBalanceCreatedDomainEvent,
            AccountBalanceUpdatedDomainEvent
        ];
    }

    async on({
        id, amount, updatedAt, balance
    }: AccountBalanceCreatedDomainEvent | AccountBalanceUpdatedDomainEvent): Promise<void> {
        await this.#saver.run(
            new AccountId(id),
            new Amount(amount),
            new Balance(balance),
            new DatetimeValueObject(updatedAt)
        );
    }
}

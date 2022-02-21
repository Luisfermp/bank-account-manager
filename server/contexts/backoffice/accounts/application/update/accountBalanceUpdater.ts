import AccountRepository from '@backoffice/accounts/domain/accountRepository';
import { EventBus } from '@shared/domain/bus/event/eventBus';
import type AccountId from '@backoffice/accounts/domain/accountId';
import type Amount from '@backoffice/accounts/domain/amount';
import AccountNotFound from '@backoffice/accounts/domain/accountNotFound';

export default class AccountBalanceUpdater {
    private repository: AccountRepository;

    private bus: EventBus;

    constructor(repository: AccountRepository, bus: EventBus) {
        this.repository = repository;
        this.bus = bus;
    }

    async run(accountId: AccountId, amount: Amount): Promise<void> {
        const account = await this.repository.find(accountId);

        if (!account) throw new AccountNotFound(accountId.value);

        account.updateBalance(amount);

        await this.repository.save(account);
        await this.bus.publish(account.pullDomainEvents());
    }
}

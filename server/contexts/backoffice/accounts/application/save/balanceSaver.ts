import AccountRepository from '@backoffice/accounts/domain/accountRepository';
import { EventBus } from '@shared/domain/bus/event/eventBus';
import type AccountId from '@backoffice/accounts/domain/accountId';
import type Amount from '@backoffice/accounts/domain/amount';
import Account from '@backoffice/accounts/domain/account';

export default class BalanceSaver {
    private repository: AccountRepository;

    private bus: EventBus;

    constructor(repository: AccountRepository, bus: EventBus) {
        this.repository = repository;
        this.bus = bus;
    }

    async run(accountId: AccountId, amount: Amount): Promise<void> {
        let account = await this.repository.get(accountId);

        //* On a real api, this must thrown an AccountNotFoundError
        //* Why? Because you can't save a balance over an unexisting account
        //* So I prefer to make this "grant" to enhance api use experience
        if (!account) account = Account.createBalance(accountId, amount);
        else account.updateBalance(amount);

        await this.repository.save(account);
        await this.bus.publish(account.pullDomainEvents());
    }
}

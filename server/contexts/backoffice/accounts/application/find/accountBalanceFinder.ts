import AccountNotFound from '@backoffice/accounts/domain/accountNotFound';
import Account from '@backoffice/accounts/domain/account';
import AccountId from '@backoffice/accounts/domain/accountId';
import AccountRepository from '@backoffice/accounts/domain/accountRepository';

export default class AccountBalanceFinder {
    #repository: AccountRepository;

    constructor(repository: AccountRepository) {
        this.#repository = repository;
    }

    async run(accountId: AccountId): Promise<Account> {
        const account = await this.#repository.find(accountId);

        if (!account) throw new AccountNotFound(accountId.value);

        return account;
    }
}

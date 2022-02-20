import AccountId from '@backoffice/accounts/domain/accountId';
import AccountRepository from '@backoffice/accounts/domain/accountRepository';
import AccountSummary from '@backoffice/accounts/domain/accountSummary';
import AccountSummaryNotFound from '@backoffice/accounts/domain/accountSummaryNotFound';

export default class AccountSummaryFinder {
    #repository: AccountRepository;

    constructor(repository: AccountRepository) {
        this.#repository = repository;
    }

    async run(accountId: AccountId): Promise<AccountSummary> {
        const account = await this.#repository.findSummary(accountId);

        if (!account) throw new AccountSummaryNotFound(accountId.value);

        return account;
    }
}

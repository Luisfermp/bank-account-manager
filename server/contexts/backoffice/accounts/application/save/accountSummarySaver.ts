import DatetimeValueObject from '@shared/domain/datetimeValueObject';
import Balance from '@backoffice/accounts/domain/balance';
import Amount from '@backoffice/accounts/domain/amount';
import AccountId from '@backoffice/accounts/domain/accountId';
import AccountRepository from '@backoffice/accounts/domain/accountRepository';
import AccountSummary from '@backoffice/accounts/domain/accountSummary';

export default class AccountSummarySaver {
    #repository: AccountRepository;

    constructor(repository: AccountRepository) {
        this.#repository = repository;
    }

    async run(accountId: AccountId, amount: Amount, balance: Balance, date: DatetimeValueObject): Promise<void> {
        let accountSummary = await this.#repository.findSummary(accountId);

        if (!accountSummary) accountSummary = AccountSummary.create(accountId, balance, amount, date);
        else accountSummary.update(balance, amount, date);

        await this.#repository.saveSummary(accountSummary);
    }
}

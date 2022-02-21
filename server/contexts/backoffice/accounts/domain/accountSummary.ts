import Balance from '@backoffice/accounts/domain/balance';
import Amount from '@backoffice/accounts/domain/amount';
import DatetimeValueObject from '@shared/domain/datetimeValueObject';
import AccountId from '@backoffice/accounts/domain/accountId';

export interface Summary {
    date: DatetimeValueObject
    amount: Amount
    balance: Balance
}

export default class AccountSummary {
    #accountId: AccountId;

    #summary: Array<Summary>;

    constructor(accountId: AccountId, summary: Array<Summary>) {
        this.#accountId = accountId;
        this.#summary = summary;
    }

    get accountId(): AccountId {
        return this.#accountId;
    }

    get summary(): Array<Summary> {
        return this.#summary;
    }

    static fromPrimitives({
        accountId,
        summary
    }: { accountId: number, summary: { date: string, amount: number, balance: number }[]}): AccountSummary {
        return new AccountSummary(
            new AccountId(accountId),
            summary.map((s) => ({
                amount: new Amount(s.amount),
                balance: new Balance(s.balance),
                date: new DatetimeValueObject(s.date)
            }))
        );
    }

    toPrimitives(): { accountId: number, summary: { date: string, amount: number, balance: number }[]} {
        const { summary, accountId } = this;

        return {
            accountId: accountId.value,
            summary: summary.map((s) => ({
                date: s.date.value,
                amount: s.amount.value,
                balance: s.balance.value
            }))
        };
    }

    static create(
        accountId: AccountId,
        balance: Balance,
        amount: Amount,
        date: DatetimeValueObject
    ) {
        return new AccountSummary(accountId, [{ balance, amount, date }]);
    }

    update(
        balance: Balance,
        amount: Amount,
        date: DatetimeValueObject
    ) {
        this.#summary.push({
            balance, amount, date
        });
    }
}

/* eslint-disable no-underscore-dangle */
import AccountId from '@backoffice/accounts/domain/accountId';
import Balance from '@backoffice/accounts/domain/balance';
import Amount from '@backoffice/accounts/domain/amount';
import AccountBalanceUpdatedDomainEvent from '@backoffice/accounts/domain/accountBalanceUpdated';
import AggregateRoot from '@shared/domain/aggregateRoot';
import DatetimeValueObject from '@shared/domain/datetimeValueObject';
import AccountBalanceCreatedDomainEvent from '@backoffice/accounts/domain/accountBalanceCreated';

export default class Account extends AggregateRoot {
    readonly id: AccountId;

    private _balance: Balance;

    private _updatedAt: DatetimeValueObject;

    constructor(
        id: AccountId,
        balance: Balance,
        updatedAt: DatetimeValueObject
    ) {
        super();
        this.id = id;
        this._balance = balance;
        this._updatedAt = updatedAt;
    }

    get balance(): Balance {
        return new Balance(this._balance.value);
    }

    get updatedAt(): DatetimeValueObject {
        return new DatetimeValueObject(this._updatedAt.value);
    }

    static fromPrimitives({
        id, updatedAt, balance
    }: {id: number, balance: number, updatedAt: string }): Account {
        return new Account(
            new AccountId(id),
            new Balance(balance),
            new DatetimeValueObject(updatedAt)
        );
    }

    toPrimitives(): {
    id: number;
    balance: number;
    updatedAt: string
    } {
        const {
            id, balance, updatedAt
        } = this;

        return {
            id: id.value,
            balance: balance.value,
            updatedAt: updatedAt.value
        };
    }

    /**
   * This method allow us to update the balance for a given account
   * @param {Amount} amount with the amount to increase/decrease the account balance
   * @throws {InvalidArgumentError} Whenever the new balance is a negative number
   */
    updateBalance(amount: Amount): void {
        const newBalance = new Balance(this.balance.value + amount.value);

        this._balance = newBalance;
        this._updatedAt = DatetimeValueObject.now();

        this.record(new AccountBalanceUpdatedDomainEvent({
            ...this.toPrimitives(),
            amount: amount.value
        }));
    }

    /**
   * This method allow us to create the balance for a given account
   * @param {Amount} amount with the amount to increase/decrease the account balance
   * @throws {InvalidArgumentError} Whenever the new balance is a negative number
   */
    static createBalance(id: AccountId, amount: Amount): Account {
        const account = new Account(
            id,
            new Balance(amount.value),
            DatetimeValueObject.now()
        );

        account.record(
            new AccountBalanceCreatedDomainEvent({
                ...account.toPrimitives(),
                amount: amount.value
            })
        );

        return account;
    }
}

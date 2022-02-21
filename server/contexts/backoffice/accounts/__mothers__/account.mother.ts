import Account from '@backoffice/accounts/domain/account';
import AccountId from '@backoffice/accounts/domain/accountId';
import Balance from '@backoffice/accounts/domain/balance';
import AccountIdMother from '@backoffice/accounts/__mothers__/accountId.mother';
import BalanceMother from '@backoffice/accounts/__mothers__/balance.mother';
import DatetimeValueObject from '@shared/domain/datetimeValueObject';
import DatetimeValueObjectMother from '@shared/__mothers__/datetimeValueObject.mother';

export default class AccountMother {
    static create({ id, balance, updatedAt }: {
    id: AccountId,
      balance: Balance,
      updatedAt: DatetimeValueObject
  }): Account {
        return new Account(id, balance, updatedAt);
    }

    static random(overwrites?: { id?: AccountId, balance?: Balance}): Account {
        return AccountMother.create({
            id: overwrites?.id ?? AccountIdMother.random(),
            balance: overwrites?.balance ?? BalanceMother.random(),
            updatedAt: DatetimeValueObjectMother.random()
        });
    }

    static randomWithAmountZero(): Account {
        return AccountMother.create({
            id: AccountIdMother.random(),
            balance: BalanceMother.create(0),
            updatedAt: DatetimeValueObjectMother.random()
        });
    }
}

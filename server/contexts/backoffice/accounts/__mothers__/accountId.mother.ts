import AccountId from '@backoffice/accounts/domain/accountId';
import IntegerMother from '@shared/__mothers__/integer.mother';

export default class AccountIdMother {
    static create(value: number): AccountId {
        return new AccountId(value);
    }

    static random(): AccountId {
        return AccountIdMother.create(IntegerMother.randomPositive());
    }
}

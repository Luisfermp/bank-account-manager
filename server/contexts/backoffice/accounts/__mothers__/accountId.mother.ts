import * as faker from 'faker';
import AccountId from '@backoffice/accounts/domain/accountId';

export default class AccountIdMother {
    static create(value: string): AccountId {
        return new AccountId(value);
    }

    static random(): AccountId {
        return AccountIdMother.create(faker.datatype.uuid());
    }
}

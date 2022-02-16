import Balance from '@backoffice/accounts/domain/balance';
import IntegerMother from '@shared/__mothers__/integer.mother';

export default class BalanceMother {
    static create(value: number): Balance {
        return new Balance(value);
    }

    static random(): Balance {
        return BalanceMother.create(IntegerMother.randomPositive());
    }
}

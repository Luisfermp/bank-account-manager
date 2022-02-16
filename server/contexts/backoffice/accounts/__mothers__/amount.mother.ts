import Amount from '@backoffice/accounts/domain/amount';
import IntegerMother from '@shared/__mothers__/integer.mother';

export default class AmountMother {
    static create(value: number): Amount {
        return new Amount(value);
    }

    static random(): Amount {
        return AmountMother.create(IntegerMother.random());
    }

    static randomPositive(): Amount {
        return AmountMother.create(IntegerMother.randomPositive());
    }

    static randomNegative(): Amount {
        return AmountMother.create(IntegerMother.randomNegative());
    }
}

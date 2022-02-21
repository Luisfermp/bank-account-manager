import MotherCreator from '@shared/__mothers__/motherCreator.mother';

export default class IntegerMother {
    static random(max?: number): number {
        return MotherCreator.random().datatype.number(max);
    }

    static randomPositive(max?: number): number {
        return MotherCreator.random().datatype.number({ min: 0, max });
    }

    static randomNegative(): number {
        return MotherCreator.random().datatype.number({ max: -1 });
    }
}

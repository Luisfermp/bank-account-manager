import { Comparable } from '@shared/domain/comparable';
import InvalidArgumentError from '@shared/domain/invalidArgumentError';

export default class PositiveNumberValueObject implements Comparable {
    readonly value: number;

    constructor(value: number) {
        this.ensureIsValid(value);
        this.value = value;
    }

    // eslint-disable-next-line class-methods-use-this
    ensureIsValid(value: number): void {
        if (value < 0) {
            throw new InvalidArgumentError(`${this.constructor.name} must be greather or equal than 0`);
        }
    }

    equalsTo(other: PositiveNumberValueObject): boolean {
        return this.value === other.value;
    }
}

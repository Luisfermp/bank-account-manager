import { v4 } from 'uuid';
import validate from 'uuid-validate';
import InvalidArgumentError from '@shared/domain/invalidArgumentError';
import { Comparable } from '@shared/domain/comparable';

export default class Uuid implements Comparable {
    readonly value: string;

    constructor(value: string) {
        this.ensureIsValidUuid(value);

        this.value = value;
    }

    static random(): Uuid {
        return new Uuid(v4());
    }

    static clone(id: Uuid): Uuid {
        return new Uuid(id.value);
    }

    private ensureIsValidUuid(id: string): void {
        if (!validate(id)) {
            throw new InvalidArgumentError(
                `<${this.constructor.name}> does not allow the value <${id}>`
            );
        }
    }

    toString(): string {
        return this.value;
    }

    equalsTo(other: Uuid): boolean {
        return this.toString() === other.toString();
    }
}

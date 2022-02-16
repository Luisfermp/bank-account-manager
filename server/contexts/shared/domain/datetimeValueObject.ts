import moment from 'moment';
import InvalidArgumentError from '@shared/domain/invalidArgumentError';
import StringValueObject from '@shared/domain/stringValueObject';

export default class DatetimeValueObject extends StringValueObject {
    constructor(datetime?: string) {
        DatetimeValueObject.ensureIsValidDate(datetime);

        super(moment(datetime).toISOString());
    }

    private static ensureIsValidDate(value?: string): void {
        const date = moment(value);

        if (!date.isValid()) {
            throw new InvalidArgumentError(`<${this.name}> doesn't allow the value <${value}>`);
        }
    }

    static now(): DatetimeValueObject {
        return new DatetimeValueObject(new Date(Date.now()).toISOString());
    }

    toSeconds(): number {
        return moment(this.value).unix();
    }
}

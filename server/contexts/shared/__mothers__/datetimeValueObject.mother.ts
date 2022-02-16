import DatetimeValueObject from '@shared/domain/datetimeValueObject';
import MotherCreator from '@shared/__mothers__/motherCreator.mother';
import moment from 'moment';

export default class DatetimeValueObjectMother {
    static create(datetime?: string): DatetimeValueObject {
        return new DatetimeValueObject(datetime);
    }

    static random(): DatetimeValueObject {
        const date = MotherCreator.random().date.recent();

        return DatetimeValueObjectMother.create(date.toISOString());
    }

    static olderThanToday(): DatetimeValueObject {
        const date = MotherCreator.random().date.past(undefined, moment().subtract(1, 'day').toDate());

        return DatetimeValueObjectMother.create(date.toISOString());
    }

    static olderThanOneHour(): DatetimeValueObject {
        const date = MotherCreator.random().date.past(undefined, moment().subtract(1, 'hour').toDate());

        return DatetimeValueObjectMother.create(date.toISOString());
    }
}

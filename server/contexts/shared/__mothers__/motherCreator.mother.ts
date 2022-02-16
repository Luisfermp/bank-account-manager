import * as faker from 'faker';

export default class MotherCreator {
    static random(): Faker.FakerStatic {
        return faker;
    }
}

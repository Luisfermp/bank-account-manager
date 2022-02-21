import MotherCreator from '@shared/__mothers__/motherCreator.mother';

export default class UuidMother {
    static random(): string {
        return MotherCreator.random().datatype.uuid();
    }
}

import IntegerMother from '@shared/__mothers__/integer.mother';

export default class Repeater {
    // eslint-disable-next-line @typescript-eslint/ban-types
    static random(callable: Function, iterations?: number): Array<any> {
        return Array(
            // eslint-disable-next-line eqeqeq
            iterations != undefined ? iterations : IntegerMother.random(20)
        )
            .fill({})
            .map(() => callable());
    }
}

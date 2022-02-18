export default class CustomError extends Error {
    public code: number;

    public name: string;

    constructor(err: string, code: number) {
        super(err);

        this.code = code;

        this.name = this.constructor.name;
    }
}

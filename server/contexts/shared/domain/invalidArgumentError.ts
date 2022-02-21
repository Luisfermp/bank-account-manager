import CustomError from '@shared/domain/customError';

export default class InvalidArgumentError extends CustomError {
    static INVALID_ARGUMENT_ERROR_CODE = 10000;

    constructor(msg: string) {
        super(
            msg,
            InvalidArgumentError.INVALID_ARGUMENT_ERROR_CODE
        );
    }
}

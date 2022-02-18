import CustomError from '@shared/domain/customError';

export default class AccountNotFound extends CustomError {
    static ACCOUNT_NOT_FOUND_CODE = 10002;

    constructor(accountId: number) {
        super(`Account ${accountId} doesn't exist`, AccountNotFound.ACCOUNT_NOT_FOUND_CODE);
    }
}

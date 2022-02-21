import CustomError from '@shared/domain/customError';

export default class AccountSummaryNotFound extends CustomError {
    static ACCOUNT_NOT_FOUND_CODE = 10005;

    constructor(accountId: number) {
        super(`Account summary for ${accountId} doesn't exist`, AccountSummaryNotFound.ACCOUNT_NOT_FOUND_CODE);
    }
}

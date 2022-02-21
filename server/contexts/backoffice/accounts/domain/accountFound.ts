import CustomError from '@shared/domain/customError';

export default class AccountFound extends CustomError {
    static ACCOUNT_FOUND_CODE = 10001;

    constructor(accountId: number) {
        super(`Account ${accountId} exist`, AccountFound.ACCOUNT_FOUND_CODE);
    }
}

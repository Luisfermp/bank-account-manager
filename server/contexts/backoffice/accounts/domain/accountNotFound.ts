export default class AccountNotFound extends Error {
    constructor(accountId: number) {
        super(`Account ${accountId} doesn't exist`);
    }
}

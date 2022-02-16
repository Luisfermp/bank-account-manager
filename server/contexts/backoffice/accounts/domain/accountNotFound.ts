export default class AccountNotFound extends Error {
    constructor(accountId: string) {
        super(`Account ${accountId} doesn't exist`);
    }
}

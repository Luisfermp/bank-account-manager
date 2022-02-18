export default class AccountFound extends Error {
    constructor(accountId: number) {
        super(`Account ${accountId} exist`);
    }
}

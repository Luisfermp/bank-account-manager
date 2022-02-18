/* eslint-disable jest/no-standalone-expect */
import Account from '@backoffice/accounts/domain/account';
import AccountId from '@backoffice/accounts/domain/accountId';
import AccountRepository from '@backoffice/accounts/domain/accountRepository';
import { Nullable } from '@shared/domain/nullable';

export default class AccountRepositoryMock implements AccountRepository {
    private findFn = jest.fn();

    private saveFn = jest.fn();

    find(accountId: AccountId): Promise<Nullable<Account>> {
        return this.findFn(accountId);
    }

    whenGetThenReturn(account: Account): void {
        this.findFn.mockResolvedValue(account);
    }

    assertGetIsCalled(accountId: AccountId): void {
        expect(this.findFn).toHaveBeenCalledWith(accountId);
    }

    save(account: Account): Promise<void> {
        return this.saveFn(account);
    }

    assertSaveIsCalled(): void {
        // eslint-disable-next-line jest/prefer-called-with
        expect(this.saveFn).toHaveBeenCalled();
    }

    assertSaveIsCalledWith(account: Account): void {
        const { calls } = this.saveFn.mock,
            lastCall = calls[calls.length - 1],
            accountUpdated: Account = lastCall[0],
            primitives = accountUpdated.toPrimitives();
        expect(primitives).toStrictEqual({
            ...account.toPrimitives(),
            //* FIXME: try to find another way to manage date update --> Because it could be a difference between given and updated date
            updatedAt: expect.any(String)
        });
    }
}

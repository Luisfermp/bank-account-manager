import AccountMother from '@backoffice/accounts/__mothers__/account.mother';
import AccountNotFound from '@backoffice/accounts/domain/accountNotFound';
import AccountBalanceFinder from '@backoffice/accounts/application/find/accountBalanceFinder';
import FindAccountBalanceQueryHandler from '@backoffice/accounts/application/find/findAccountBalanceQueryHandler';
import AccountRepositoryMock from '@backoffice/accounts/__mocks__/accountRepository.mock';
import FindAccountBalanceQueryMother from '@backoffice/accounts/__mothers__/findAccountBalanceCommand.mother';

describe('accountBalanceFinder', () => {
    it('should throw AccountNotFound when the account to find doesn\'t exists', async () => {
        expect.hasAssertions();
        const repository = new AccountRepositoryMock(),
            finder = new AccountBalanceFinder(repository),
            handler = new FindAccountBalanceQueryHandler(finder);

        await expect(handler.handle(FindAccountBalanceQueryMother.random())).rejects.toThrow(AccountNotFound);
    });

    it('should return the account', async () => {
        expect.hasAssertions();
        const repository = new AccountRepositoryMock(),
            finder = new AccountBalanceFinder(repository),
            handler = new FindAccountBalanceQueryHandler(finder),
            account = AccountMother.random();

        repository.whenGetThenReturn(account);

        await expect(handler.handle(FindAccountBalanceQueryMother.random())).resolves.toStrictEqual(account.toPrimitives());
    });
});

import AccountSummaryNotFound from '@backoffice/accounts/domain/accountSummaryNotFound';
import AccountRepositoryMock from '@backoffice/accounts/__mocks__/accountRepository.mock';
import AccountSummaryFinder from '@backoffice/accounts/application/find/accountSummaryFinder';
import FindAccountSummaryQueryHandler from '@backoffice/accounts/application/find/findAccountSummaryQueryHandler';
import FindAccountSummaryQueryMother from '@backoffice/accounts/__mothers__/findAccountSummaryQuery.mother';
import AccountSummaryMother from '@backoffice/accounts/__mothers__/accountSummary.mother';

describe('accountSummaryFinder', () => {
    it('should throw AccountSummaryNotFound when the account summary to find doesn\'t exists', async () => {
        expect.hasAssertions();
        const repository = new AccountRepositoryMock(),
            finder = new AccountSummaryFinder(repository),
            handler = new FindAccountSummaryQueryHandler(finder);

        await expect(handler.handle(FindAccountSummaryQueryMother.random())).rejects.toThrow(AccountSummaryNotFound);
    });

    it('should return the account summary', async () => {
        expect.hasAssertions();
        const repository = new AccountRepositoryMock(),
            finder = new AccountSummaryFinder(repository),
            handler = new FindAccountSummaryQueryHandler(finder),
            accountSummary = AccountSummaryMother.random();

        repository.whenFindSummaryThenReturn(accountSummary);

        await expect(handler.handle(FindAccountSummaryQueryMother.random())).resolves.toStrictEqual(accountSummary.toPrimitives());
    });
});

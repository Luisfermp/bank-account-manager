import AccountSummaryMother from '@backoffice/accounts/__mothers__/accountSummary.mother';
import AccountSummarySaver from '@backoffice/accounts/application/save/accountSummarySaver';
import AccountRepositoryMock from '@backoffice/accounts/__mocks__/accountRepository.mock';
import SaveAccountSummaryOnAccountBalanceSaved from '@backoffice/accounts/application/save/saveAccountSummaryOnAccountBalanceSaved';
import AccountIdMother from '@backoffice/accounts/__mothers__/accountId.mother';
import BalanceMother from '@backoffice/accounts/__mothers__/balance.mother';
import AmountMother from '@backoffice/accounts/__mothers__/amount.mother';
import DatetimeValueObjectMother from '@shared/__mothers__/datetimeValueObject.mother';
import AccountBalanceCreatedDomainEvent from '@backoffice/accounts/domain/accountBalanceCreated';

describe('accountSummarySaver', () => {
    it('should create the summary', async () => {
        expect.hasAssertions();
        const accountId = AccountIdMother.random(),
            balance = BalanceMother.random(),
            amount = AmountMother.random(),
            date = DatetimeValueObjectMother.random(),
            accountSummary = AccountSummaryMother.create(accountId, [{ balance, amount, date }]),
            repository = new AccountRepositoryMock(),
            saver = new AccountSummarySaver(repository),
            handler = new SaveAccountSummaryOnAccountBalanceSaved(saver);

        await expect(handler.on({
            id: accountId.value,
            balance: balance.value,
            amount: amount.value,
            updatedAt: date.value
        } as AccountBalanceCreatedDomainEvent)).resolves.toBeUndefined();
        repository.assertSaveSummaryIsCalledWith(accountSummary);
    });

    it('should update the summary', async () => {
        expect.hasAssertions();
        const balance = BalanceMother.random(),
            amount = AmountMother.random(),
            date = DatetimeValueObjectMother.random(),
            accountSummary = AccountSummaryMother.random(),
            primitives = accountSummary.toPrimitives(),
            repository = new AccountRepositoryMock(),
            saver = new AccountSummarySaver(repository),
            handler = new SaveAccountSummaryOnAccountBalanceSaved(saver);

        await expect(handler.on({
            id: accountSummary.accountId.value,
            balance: balance.value,
            amount: amount.value,
            updatedAt: date.value
        } as AccountBalanceCreatedDomainEvent)).resolves.toBeUndefined();
        repository.assertSaveSummaryIsCalledWith(AccountSummaryMother.fromPrimitives({
            accountId: primitives.accountId,
            summary: primitives.summary.concat({
                balance: balance.value,
                amount: amount.value,
                date: date.value
            })
        }));
    });
});

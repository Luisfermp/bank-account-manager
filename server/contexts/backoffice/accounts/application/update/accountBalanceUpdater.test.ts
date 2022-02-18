import AccountBalanceUpdater from '@backoffice/accounts/application/update/accountBalanceUpdater';
import UpdateBalanceCommandHandler from '@backoffice/accounts/application/update/updateBalanceCommandHandler';
import AccountRepositoryMock from '@backoffice/accounts/__mocks__/accountRepository.mock';
import UpdateAccountBalanceCommandMother from '@backoffice/accounts/__mothers__/updateAccountBalanceCommandMother';
import EventBusMock from '@shared/__mocks__/eventBus.mock';
import AccountMother from '@backoffice/accounts/__mothers__/account.mother';
import AccountIdMother from '@backoffice/accounts/__mothers__/accountId.mother';
import BalanceMother from '@backoffice/accounts/__mothers__/balance.mother';
import AccountBalanceUpdatedDomainEvent from '@backoffice/accounts/domain/accountBalanceUpdated';

describe('accountBalanceUpdater', () => {
    it('should update the balance', async () => {
        expect.hasAssertions();
        const repository = new AccountRepositoryMock(),
            bus = new EventBusMock(),
            command = UpdateAccountBalanceCommandMother.randomWithPositiveAmount(),
            account = AccountMother.random(),
            updater = new AccountBalanceUpdater(repository, bus),
            handler = new UpdateBalanceCommandHandler(updater),
            expected = AccountMother.random({
                id: account.id,
                balance: BalanceMother.create(account.balance.value + command.amount)
            });

        repository.whenGetThenReturn(account);

        await expect(handler.handle(command)).resolves.toBeUndefined();
        repository.assertGetIsCalled(AccountIdMother.create(command.accountId));
        repository.assertSaveIsCalledWith(expected);
    });

    it('should publish AccountBalanceUpdatedDomainEvent', async () => {
        expect.hasAssertions();
        const repository = new AccountRepositoryMock(),
            bus = new EventBusMock(),
            command = UpdateAccountBalanceCommandMother.randomWithPositiveAmount(),
            account = AccountMother.random(),
            updater = new AccountBalanceUpdater(repository, bus),
            handler = new UpdateBalanceCommandHandler(updater);

        repository.whenGetThenReturn(account);

        await expect(handler.handle(command)).resolves.toBeUndefined();
        repository.assertGetIsCalled(AccountIdMother.create(command.accountId));
        bus.assertLastPublishedEventTypeIs(AccountBalanceUpdatedDomainEvent);
    });
});

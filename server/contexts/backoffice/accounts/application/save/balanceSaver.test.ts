import BalanceSaver from '@backoffice/accounts/application/save/balanceSaver';
import SaveBalanceCommandHandler from '@backoffice/accounts/application/save/saveBalanceCommandHandler';
import AccountRepositoryMock from '@backoffice/accounts/__mocks__/accountRepository.mock';
import SaveBalanceCommandMother from '@backoffice/accounts/__mothers__/saveBalanceCommand.mother';
import EventBusMock from '@shared/__mocks__/eventBus.mock';
import AccountMother from '@backoffice/accounts/__mothers__/account.mother';
import AccountIdMother from '@backoffice/accounts/__mothers__/accountId.mother';
import BalanceMother from '@backoffice/accounts/__mothers__/balance.mother';
import AccountBalanceUpdatedDomainEvent from '@backoffice/accounts/domain/accountBalanceUpdated';
import AccountBalanceCreatedDomainEvent from '@backoffice/accounts/domain/accountBalanceCreated';

describe('balanceSaver', () => {
    it('should create the balance when there isn\'t stored in our system', async () => {
        expect.hasAssertions();
        const repository = new AccountRepositoryMock(),
            bus = new EventBusMock(),
            command = SaveBalanceCommandMother.random(),
            updater = new BalanceSaver(repository, bus),
            handler = new SaveBalanceCommandHandler(updater);

        await expect(handler.handle(command)).resolves.toBeUndefined();
        repository.assertGetIsCalled(AccountIdMother.create(command.accountId));
        repository.assertSaveIsCalled();
    });

    it('should publish AccountBalanceCreatedDomainEvent', async () => {
        expect.hasAssertions();
        const repository = new AccountRepositoryMock(),
            bus = new EventBusMock(),
            command = SaveBalanceCommandMother.random(),
            updater = new BalanceSaver(repository, bus),
            handler = new SaveBalanceCommandHandler(updater);

        await expect(handler.handle(command)).resolves.toBeUndefined();
        repository.assertGetIsCalled(AccountIdMother.create(command.accountId));
        bus.assertLastPublishedEventTypeIs(AccountBalanceCreatedDomainEvent);
    });
    it('should update the balance', async () => {
        expect.hasAssertions();
        const repository = new AccountRepositoryMock(),
            bus = new EventBusMock(),
            command = SaveBalanceCommandMother.randomWithPositiveAmount(),
            account = AccountMother.random(),
            updater = new BalanceSaver(repository, bus),
            handler = new SaveBalanceCommandHandler(updater),
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
            command = SaveBalanceCommandMother.randomWithPositiveAmount(),
            account = AccountMother.random(),
            updater = new BalanceSaver(repository, bus),
            handler = new SaveBalanceCommandHandler(updater);

        repository.whenGetThenReturn(account);

        await expect(handler.handle(command)).resolves.toBeUndefined();
        repository.assertGetIsCalled(AccountIdMother.create(command.accountId));
        bus.assertLastPublishedEventTypeIs(AccountBalanceUpdatedDomainEvent);
    });
});

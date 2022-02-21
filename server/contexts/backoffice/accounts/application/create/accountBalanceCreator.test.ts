import AccountRepositoryMock from '@backoffice/accounts/__mocks__/accountRepository.mock';
import EventBusMock from '@shared/__mocks__/eventBus.mock';
import AccountMother from '@backoffice/accounts/__mothers__/account.mother';
import AccountIdMother from '@backoffice/accounts/__mothers__/accountId.mother';
import AccountBalanceCreatedDomainEvent from '@backoffice/accounts/domain/accountBalanceCreated';
import AccountBalanceCreator from '@backoffice/accounts/application/create/accountBalanceCreator';
import CreateBalanceCommandHandler from '@backoffice/accounts/application/create/createBalanceCommandHandler';
import CreateAccountBalanceCommandMother from '@backoffice/accounts/__mothers__/createAccountBalanceCommandMother';
import AccountFound from '@backoffice/accounts/domain/accountFound';

describe('balanceCreator', () => {
    it('should create the balance when there isn\'t stored in our system', async () => {
        expect.hasAssertions();
        const repository = new AccountRepositoryMock(),
            bus = new EventBusMock(),
            command = CreateAccountBalanceCommandMother.random(),
            creator = new AccountBalanceCreator(repository, bus),
            handler = new CreateBalanceCommandHandler(creator);

        await expect(handler.handle(command)).resolves.toBeUndefined();
        repository.assertGetIsCalled(AccountIdMother.create(command.accountId));
        repository.assertSaveIsCalled();
    });

    it('should throw AccountFound when the account exists', async () => {
        expect.hasAssertions();
        const repository = new AccountRepositoryMock(),
            bus = new EventBusMock(),
            command = CreateAccountBalanceCommandMother.random(),
            creator = new AccountBalanceCreator(repository, bus),
            handler = new CreateBalanceCommandHandler(creator);

        repository.whenGetThenReturn(AccountMother.random());

        await expect(handler.handle(command)).rejects.toThrow(AccountFound);
        repository.assertGetIsCalled(AccountIdMother.create(command.accountId));
    });

    it('should publish AccountBalanceCreatedDomainEvent', async () => {
        expect.hasAssertions();
        const repository = new AccountRepositoryMock(),
            bus = new EventBusMock(),
            command = CreateAccountBalanceCommandMother.random(),
            creator = new AccountBalanceCreator(repository, bus),
            handler = new CreateBalanceCommandHandler(creator);

        await expect(handler.handle(command)).resolves.toBeUndefined();
        repository.assertGetIsCalled(AccountIdMother.create(command.accountId));
        bus.assertLastPublishedEventTypeIs(AccountBalanceCreatedDomainEvent);
    });
});

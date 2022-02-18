import AccountRepositoryMock from '@backoffice/accounts/__mocks__/accountRepository.mock';
import EventBusMock from '@shared/__mocks__/eventBus.mock';
import AccountIdMother from '@backoffice/accounts/__mothers__/accountId.mother';
import AccountBalanceCreatedDomainEvent from '@backoffice/accounts/domain/accountBalanceCreated';
import AccountBalanceCreator from '@backoffice/accounts/application/create/accountBalanceCreator';
import CreateBalanceCommandHandler from '@backoffice/accounts/application/create/createBalanceCommandHandler';
import CreateAccountBalanceCommandMother from '@backoffice/accounts/__mothers__/createAccountBalanceCommandMother';

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

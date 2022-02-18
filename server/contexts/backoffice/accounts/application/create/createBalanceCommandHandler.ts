/* eslint-disable class-methods-use-this */
import Command from '@shared/domain/bus/command/command';
import { CommandHandler } from '@shared/domain/bus/command/commandHandler';
import Amount from '@backoffice/accounts/domain/amount';
import AccountId from '@backoffice/accounts/domain/accountId';
import AccountBalanceCreator from '@backoffice/accounts/application/create/accountBalanceCreator';
import CreateBalanceCommand from '@backoffice/accounts/application/create//createBalanceCommand';

export default class CreateBalanceCommandHandler implements CommandHandler<CreateBalanceCommand> {
    private creator: AccountBalanceCreator;

    constructor(creator: AccountBalanceCreator) {
        this.creator = creator;
    }

    subscribedTo(): Command {
        return CreateBalanceCommand;
    }

    async handle(command: CreateBalanceCommand): Promise<void> {
        const accountId = new AccountId(command.accountId),
            balance = new Amount(command.balance);

        await this.creator.run(accountId, balance);
    }
}

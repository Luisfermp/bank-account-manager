/* eslint-disable class-methods-use-this */
import AccountBalanceUpdater from '@backoffice/accounts/application/update/accountBalanceUpdater';
import Command from '@shared/domain/bus/command/command';
import { CommandHandler } from '@shared/domain/bus/command/commandHandler';
import Amount from '@backoffice/accounts/domain/amount';
import UpdateAccountBalanceCommand from '@backoffice/accounts/application/update/updateAccountBalanceCommand';
import AccountId from '@backoffice/accounts/domain/accountId';

export default class UpdateAccountBalanceCommandHandler implements CommandHandler<UpdateAccountBalanceCommand> {
    private updater: AccountBalanceUpdater;

    constructor(updater: AccountBalanceUpdater) {
        this.updater = updater;
    }

    subscribedTo(): Command {
        return UpdateAccountBalanceCommand;
    }

    async handle(command: UpdateAccountBalanceCommand): Promise<void> {
        const accountId = new AccountId(command.accountId),
            amount = new Amount(command.amount);

        await this.updater.run(accountId, amount);
    }
}

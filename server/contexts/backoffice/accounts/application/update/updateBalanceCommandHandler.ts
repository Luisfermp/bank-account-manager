/* eslint-disable class-methods-use-this */
import BalanceUpdater from '@backoffice/accounts/application/update/balanceUpdater';
import Command from '@shared/domain/bus/command/command';
import { CommandHandler } from '@shared/domain/bus/command/commandHandler';
import Amount from '@backoffice/accounts/domain/amount';
import UpdateBalanceCommand from '@backoffice/accounts/application/update/updateBalanceCommand';
import AccountId from '@backoffice/accounts/domain/accountId';

export default class UpdateBalanceCommandHandler implements CommandHandler<UpdateBalanceCommand> {
    private updater: BalanceUpdater;

    constructor(updater: BalanceUpdater) {
        this.updater = updater;
    }

    subscribedTo(): Command {
        return UpdateBalanceCommand;
    }

    async handle(command: UpdateBalanceCommand): Promise<void> {
        const accountId = new AccountId(command.accountId),
            amount = new Amount(command.amount);

        await this.updater.run(accountId, amount);
    }
}

/* eslint-disable class-methods-use-this */
import BalanceSaver from '@backoffice/accounts/application/save/balanceSaver';
import Command from '@shared/domain/bus/command/command';
import { CommandHandler } from '@shared/domain/bus/command/commandHandler';
import Amount from '@backoffice/accounts/domain/amount';
import SaveBalanceCommand from '@backoffice/accounts/application/save/saveBalanceCommand';
import AccountId from '@backoffice/accounts/domain/accountId';

export default class SaveBalanceCommandHandler implements CommandHandler<SaveBalanceCommand> {
    private saver: BalanceSaver;

    constructor(updater: BalanceSaver) {
        this.saver = updater;
    }

    subscribedTo(): Command {
        return SaveBalanceCommand;
    }

    async handle(command: SaveBalanceCommand): Promise<void> {
        const accountId = new AccountId(command.accountId),
            amount = new Amount(command.amount);

        await this.saver.run(accountId, amount);
    }
}

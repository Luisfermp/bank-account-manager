import Command from '@shared/domain/bus/command/command';

type Params = {
  accountId: number,
  balance: number
}

export default class CreateBalanceCommand extends Command {
    readonly accountId: number;

    readonly balance: number;

    constructor({ accountId, balance }: Params) {
        super();
        this.accountId = accountId;
        this.balance = balance;
    }
}

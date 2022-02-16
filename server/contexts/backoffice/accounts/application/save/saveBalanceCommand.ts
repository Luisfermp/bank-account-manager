import Command from '@shared/domain/bus/command/command';

type Params = {
  accountId: number,
  amount: number
}

export default class SaveBalanceCommand extends Command {
    readonly accountId: number;

    readonly amount: number;

    constructor({ accountId, amount }: Params) {
        super();
        this.accountId = accountId;
        this.amount = amount;
    }
}

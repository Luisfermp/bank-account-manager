import Command from '@shared/domain/bus/command/command';

type Params = {
  accountId: string,
  amount: number
}

export default class SaveBalanceCommand extends Command {
    readonly accountId: string;

    readonly amount: number;

    constructor({ accountId, amount }: Params) {
        super();
        this.accountId = accountId;
        this.amount = amount;
    }
}

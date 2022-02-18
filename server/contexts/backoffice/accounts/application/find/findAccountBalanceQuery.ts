import Query from '@shared/domain/bus/query/query';

type Params = {
  accountId: number,
}

export default class FindAccountBalanceQuery extends Query {
    readonly accountId: number;

    constructor({ accountId }: Params) {
        super();
        this.accountId = accountId;
    }
}

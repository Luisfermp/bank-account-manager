import Query from '@shared/domain/bus/query/query';

type Params = {
  accountId: number,
}

export default class FindAccountSummaryQuery extends Query {
    readonly accountId: number;

    constructor({ accountId }: Params) {
        super();
        this.accountId = accountId;
    }
}

import AccountIdMother from '@backoffice/accounts/__mothers__/accountId.mother';
import FindAccountBalanceQuery from '@backoffice/accounts/application/find/findAccountBalanceQuery';

export default class FindAccountBalanceQueryMother {
    static create(params: { accountId: number }): FindAccountBalanceQuery {
        return new FindAccountBalanceQuery(params);
    }

    static random(): FindAccountBalanceQuery {
        return FindAccountBalanceQueryMother.create({
            accountId: AccountIdMother.random().value
        });
    }
}

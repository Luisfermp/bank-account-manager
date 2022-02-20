import AccountIdMother from '@backoffice/accounts/__mothers__/accountId.mother';
import FindAccountSummaryQuery from '@backoffice/accounts/application/find/findAccountSummaryQuery';

export default class FindAccountSummaryQueryMother {
    static create(params: { accountId: number }): FindAccountSummaryQuery {
        return new FindAccountSummaryQuery(params);
    }

    static random(): FindAccountSummaryQuery {
        return FindAccountSummaryQueryMother.create({
            accountId: AccountIdMother.random().value
        });
    }
}

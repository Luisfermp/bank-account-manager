/* eslint-disable class-methods-use-this */
import Command from '@shared/domain/bus/command/command';
import AccountId from '@backoffice/accounts/domain/accountId';
import { QueryHandler } from '@shared/domain/bus/query/query-handler';
import FindAccountSummaryQuery from '@backoffice/accounts/application/find/findAccountSummaryQuery';
import FindAccountSummaryQueryResponse from '@backoffice/accounts/application/find/findAccountSummaryQueryResponse';
import AccountSummaryFinder from '@backoffice/accounts/application/find/accountSummaryFinder';

export default class FindAccountSummaryQueryHandler implements QueryHandler<FindAccountSummaryQuery, FindAccountSummaryQueryResponse> {
    #finder: AccountSummaryFinder;

    constructor(finder: AccountSummaryFinder) {
        this.#finder = finder;
    }

    subscribedTo(): Command {
        return FindAccountSummaryQuery;
    }

    async handle(command: FindAccountSummaryQuery): Promise<FindAccountSummaryQueryResponse> {
        const accountId = new AccountId(command.accountId),
            accountSummary = await this.#finder.run(accountId);

        return accountSummary.toPrimitives() as FindAccountSummaryQueryResponse;
    }
}

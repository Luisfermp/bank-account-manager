/* eslint-disable class-methods-use-this */
import Command from '@shared/domain/bus/command/command';
import AccountId from '@backoffice/accounts/domain/accountId';
import FindAccountBalanceQuery from '@backoffice/accounts/application/find/findAccountBalanceQuery';
import AccountBalanceFinder from '@backoffice/accounts/application/find/accountBalanceFinder';
import { QueryHandler } from '@shared/domain/bus/query/query-handler';
import FindAccountBalanceQueryResponse from '@backoffice/accounts/application/find/findAccountBalanceQueryResponse';

export default class FindAccountBalanceQueryHandler implements QueryHandler<FindAccountBalanceQuery, FindAccountBalanceQueryResponse> {
    #finder: AccountBalanceFinder;

    constructor(finder: AccountBalanceFinder) {
        this.#finder = finder;
    }

    subscribedTo(): Command {
        return FindAccountBalanceQuery;
    }

    async handle(command: FindAccountBalanceQuery): Promise<FindAccountBalanceQueryResponse> {
        const accountId = new AccountId(command.accountId),
            account = await this.#finder.run(accountId);

        return account.toPrimitives() as FindAccountBalanceQueryResponse;
    }
}

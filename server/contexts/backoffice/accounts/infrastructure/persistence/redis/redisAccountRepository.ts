import RedisRepository from '@shared/infrastructure/persistence/redis/redisRepository';
import AccountRepository from '@backoffice/accounts/domain/accountRepository';
import Account from '@backoffice/accounts/domain/account';
import { Nullable } from '@shared/domain/nullable';
import AccountId from '@backoffice/accounts/domain/accountId';
import AccountSummary from '@backoffice/accounts/domain/accountSummary';

export const composeAccountKey = (accountId: AccountId) => `account:${accountId.value}`,
    composeSummaryKey = (accountId: AccountId) => `summary:${accountId.value}`;

export default class RedisAccountRepository extends RedisRepository implements AccountRepository {
    save(account: Account): Promise<void> {
        const key = composeAccountKey(account.id),
            entity = RedisAccountRepository.toFieldList(account.toPrimitives());
        return this.set(key, entity);
    }

    async find(accountId: AccountId): Promise<Nullable<Account>> {
        const accountPrimitives: any = await this.get(composeAccountKey(accountId));
        return accountPrimitives ? Account.fromPrimitives(accountPrimitives) : null;
    }

    async findSummary(accountId: AccountId): Promise<Nullable<AccountSummary>> {
        const summaryPrimitives: any = await this.get(composeSummaryKey(accountId));
        return summaryPrimitives ? AccountSummary.fromPrimitives({
            accountId: summaryPrimitives.accountId,
            summary: JSON.parse(summaryPrimitives.summary)
        }) : null;
    }

    saveSummary(summary: AccountSummary): Promise<void> {
        const key = composeSummaryKey(summary.accountId),
            entity = RedisAccountRepository.toFieldList(summary.toPrimitives());
        return this.set(key, entity);
    }
}

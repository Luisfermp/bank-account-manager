import RedisRepository from '@shared/infrastructure/persistence/redis/redisRepository';
import AccountRepository from '@backoffice/accounts/domain/accountRepository';
import Account from '@backoffice/accounts/domain/account';
import { Nullable } from '@shared/domain/nullable';
import AccountId from '@backoffice/accounts/domain/accountId';

export const composeAccountKey = (accountId: AccountId) => `account:${accountId.value}`;

export default class RedisAccountRepository extends RedisRepository implements AccountRepository {
    save(account: Account): Promise<void> {
        const key = composeAccountKey(account.id),
            entity = RedisAccountRepository.toFieldList(account.toPrimitives());
        return this.set(key, entity);
    }

    async find(accountId: AccountId): Promise<Nullable<Account>> {
        const accountPrimitives: any = await this.get(composeAccountKey(accountId)),
            account = accountPrimitives ? Account.fromPrimitives(accountPrimitives) : null;

        return account;
    }
}

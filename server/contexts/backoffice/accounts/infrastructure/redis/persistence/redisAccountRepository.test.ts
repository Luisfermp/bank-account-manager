/* eslint-disable jest/no-hooks */
import RedisFactory from '@shared/infrastructure/persistence/redis/redisFactory';
import AccountIdMother from '@backoffice/accounts/__mothers__/accountId.mother';
import RedisAccountRepository, { composeAccountKey } from '@backoffice/accounts/infrastructure/redis/persistence/redisAccountRepository';
import RedisRepository from '@shared/infrastructure/persistence/redis/redisRepository';
import { RedisClientType } from 'redis';
import AccountMother from '@backoffice/accounts/__mothers__/account.mother';

describe('redisAccountRepository', () => {
    let client: RedisClientType;

    beforeAll(async () => {
        client = await RedisFactory.createClient() as RedisClientType;
    });

    beforeEach(async () => {
        await client.flushAll();
    });

    afterAll(async () => {
        await client.disconnect();
    });
    describe('find', () => {
        it('should return null when there is no account stored on redis', async () => {
            expect.hasAssertions();

            const repository = new RedisAccountRepository(client as RedisClientType);

            await expect(repository.find(AccountIdMother.random())).resolves.toBeNull();
        });

        it('should return the entity stored en redis', async () => {
            expect.hasAssertions();
            const repository = new RedisAccountRepository(client as any),
                account = AccountMother.random();

            await client.hSet(
                composeAccountKey(account.id),
                RedisRepository.toFieldList(account.toPrimitives())
            );

            await expect(repository.find(account.id)).resolves.toStrictEqual(account);
        });
    });

    it('should store the account into redis', async () => {
        expect.hasAssertions();
        const repository = new RedisAccountRepository(client as any),
            account = AccountMother.random();

        await repository.save(account);

        await expect(repository.find(account.id)).resolves.toStrictEqual(account);
    });
});

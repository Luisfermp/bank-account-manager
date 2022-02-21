import { RedisClientType } from 'redis';
import { Nullable } from '@shared/domain/nullable';
import { isEmpty } from 'lodash';

export default abstract class RedisRepository {
    protected readonly client: RedisClientType;

    constructor(redisClient: RedisClientType) {
        this.client = redisClient;
    }

    static toFieldList(primitives: any): string[] {
        return (
            Object.entries(primitives)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .filter(([_key, value]) => value != null)
                .reduce((list, [key, value]) => {
                    const val = value as any,
                        normValue = typeof val === 'object'
                            ? JSON.stringify(val)
                            : val;

                    return list.concat(key as any, normValue);
                }, [])
        );
    }

    /**
     * This method allow to remove an stored object for the given key
     * @param {string} key With the key to be checked
     * @returns {void}
     */
    protected async delete(key: string): Promise<void> {
        await this.client.del(key);
    }

    /**
     * This method allow to get object stored in redis for the given key
     * @param {string} key With the key to be checked
     * @returns {Promise<Record<string, any>>} With
     */
    protected async get(key: string): Promise<Nullable<Record<string, any>>> {
        const entity = await this.client.hGetAll(key);
        return isEmpty(entity) ? null : entity;
    }

    protected async set(key: string, entity: string[]): Promise<void> {
        await this.client.hSet(
            key,
            entity
        );
    }
}

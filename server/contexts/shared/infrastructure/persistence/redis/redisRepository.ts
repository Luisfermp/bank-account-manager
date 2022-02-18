import { RedisClientType } from 'redis';
import { promisify } from 'util';
import { Nullable } from '@shared/domain/nullable';

export default abstract class RedisRepository {
    readonly #client: RedisClientType;

    constructor(redisClient: RedisClientType) {
        this.#client = redisClient;
    }

    static toFieldList(primitives: any): string[] {
        return (
            Object.entries(primitives)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .filter(([_key, value]) => value != null)
                .reduce((list, [key, value]) => {
                    const val = value as any,
                        normValue = typeof val.toString === 'function'
                            ? val.toString()
                            : val;

                    return list.concat(key as any, normValue);
                }, [])
        );
    }

    /**
     * This method allow to check if redis has stored an object based on the given key
     * @param {string} key With the key to be checked
     * @returns {Promise<boolean>} True if exists
     */
    protected async exists(key: string): Promise<boolean> {
        const exAsync = promisify(this.#client.exists).bind(this.#client);
        return (await exAsync(key)) > 0;
    }

    /**
     * This method allow to remove an stored object for the given key
     * @param {string} key With the key to be checked
     * @returns {void}
     */
    protected async delete(key: string): Promise<void> {
        const delAsync = promisify(this.#client.del).bind(this.#client);
        return delAsync(key);
    }

    /**
     * This method allow to get object stored in redis for the given key
     * @param {string} key With the key to be checked
     * @returns {Promise<Record<string, any>>} With
     */
    protected async get(key: string): Promise<Nullable<Record<string, any>>> {
        const hgetAllAsync = promisify(this.#client.hGetAll).bind(this.#client),
            exist = await this.exists(key);
        if (!exist) return null;
        return hgetAllAsync(key);
    }
}

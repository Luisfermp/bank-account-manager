/* eslint-disable no-underscore-dangle */
import { createClient } from 'redis';

export default class RedisFactory {
    static async createClient() {
        const client = RedisFactory.getClient();

        return client;
    }

    private static async getClient() {
        const host = process.env.REDIS_HOST ?? 'redis://localhost',
            port = parseInt(process.env.REDIS_PORT ?? '6379', 10);

        let client;

        if (process.env.JEST_WORKER_ID) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const jestHost = global.__TESTCONTAINERS_REDIS_IP__ ? `redis://${global.__TESTCONTAINERS_REDIS_IP__}` : null;

            client = createClient({
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                url: `${jestHost ?? host}:${global.__TESTCONTAINERS_REDIS_PORT_6379__ ?? port}`
            });
        } else {
            client = createClient({
                url: `${host}:${port}`
            });
        }

        await client.connect();

        return client;
    }
}

/* eslint-disable no-underscore-dangle */
import { createClient } from 'redis';

export default class RedisFactory {
    static createClient() {
        const client = RedisFactory.getClient();

        return client;
    }

    private static getClient() {
        const host = process.env.REDIS_HOST ?? 'http://localhost',
            port = parseInt(process.env.REDIS_PORT ?? '6379', 10);

        let client;

        if (process.env.JEST_WORKER_ID) {
            client = createClient({
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                url: `${global.__TESTCONTAINERS_ELASTICACHE_IP__ ?? host}:${global.__TESTCONTAINERS_ELASTICACHE_PORT_6379__ ?? port}`
            });
        } else {
            client = createClient({
                url: `${host}:${port}`
            });
        }

        return client;
    }
}

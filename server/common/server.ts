import express, { Application, Router } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as OpenApiValidator from 'express-openapi-validator';
import l from '@shared/infrastructure/logger';

import InMemorySyncEventBus from '@shared/infrastructure/bus/event/inMemorySyncEventBus';
import RedisFactory from '@shared/infrastructure/persistence/redis/redisFactory';
import initAccountInfra from '@backoffice/accounts/infrastructure/init';
import RedisAccountRepository from '@backoffice/accounts/infrastructure/persistence/redis/redisAccountRepository';
import { RedisClientType } from 'redis';

const app = express();

export default class ExpressServer {
    #routes: Router[];

    constructor() {
        this.#routes = [];
        const root = path.normalize(`${__dirname}/../..`);
        app.use(cors());
        app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
        app.use(
            bodyParser.urlencoded({
                extended: true,
                limit: process.env.REQUEST_LIMIT || '100kb'
            })
        );
        app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
        app.use(cookieParser(process.env.SESSION_SECRET));
        app.use(express.static(`${root}/public`));

        // eslint-disable-next-line one-var
        const apiSpec = path.join(__dirname, 'bank-account-manager-api.yml'),
            validateResponses = !!(
                process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION
      && process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true'
            );
        app.use('/spec', express.static(apiSpec));
        app.use(
            OpenApiValidator.middleware({
                apiSpec,
                validateResponses,
                ignorePaths: /.*\/spec(\/|$)/
            })
        );
    }

    async initInfra(): Promise<ExpressServer> {
        const redisClient = await RedisFactory.createClient(),
            eventBus = new InMemorySyncEventBus(),
            redisAccountRepository = new RedisAccountRepository(redisClient as RedisClientType);

        this.#routes.push(initAccountInfra(redisAccountRepository, eventBus));

        return this;
    }

    router(): ExpressServer {
        this.#routes.forEach((r) => {
            app.use(r);
        });

        return this;
    }

    // eslint-disable-next-line class-methods-use-this
    listen(port: number): Application {
        const welcome = (p: number) => (): void => l.info(
            `up and running in ${
                process.env.NODE_ENV || 'development'
            } @: ${os.hostname()} on port: ${p}}`
        );

        http.createServer(app).listen(port, welcome(port));

        return app;
    }
}

import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import * as OpenApiValidator from 'express-openapi-validator';
import l from '@shared/infrastructure/logger';

import errorHandler from '@api/middlewares/error.handler';

const app = express();

export default class ExpressServer {
    private routes: (application: Application) => void;

    constructor() {
        const root = path.normalize(`${__dirname}/../..`);
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
        const apiSpec = path.join(__dirname, 'api.yml'),
            validateResponses = !!(
                process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION
      && process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true'
            );
        app.use(process.env.OPENAPI_SPEC || '/spec', express.static(apiSpec));
        app.use(
            OpenApiValidator.middleware({
                apiSpec,
                validateResponses,
                ignorePaths: /.*\/spec(\/|$)/
            })
        );
    }

    router(routes: (application: Application) => void): ExpressServer {
        routes(app);
        app.use(errorHandler);
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

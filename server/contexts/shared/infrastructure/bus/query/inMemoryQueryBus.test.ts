/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */

import Query from '@shared/domain/bus/query/query';
import { QueryHandler } from '@shared/domain/bus/query/query-handler';
import QueryHandlersInformation from '@shared/infrastructure/bus/query/queryHandlersInformation';
import InMemoryQueryBus from '@shared/infrastructure/bus/query/inMemoryQueryBus';
import QueryNotRegisteredError from '@shared/domain/bus/query/query-not-registered-error';
import { Response } from '@shared/domain/bus/query/response';

class UnhandledQuery extends Query {
    static QUERY_NAME = 'unhandled.query';
}

class HandledQuery extends Query {
    static QUERY_NAME = 'handled.query';
}

class MyQueryHandler implements QueryHandler<Query, Response> {
    subscribedTo(): HandledQuery {
        return HandledQuery;
    }

    async handle(_query: HandledQuery): Promise<Response> {
        return {} as any;
    }
}

describe('inMemoryQueryBus', () => {
    it('throws an error if dispatches a query without handler', async () => {
        expect.hasAssertions();

        const unhandledQuery = new UnhandledQuery(),
            queryHandlersInformation = new QueryHandlersInformation([]),
            queryBus = new InMemoryQueryBus(queryHandlersInformation);

        await expect(queryBus.ask(unhandledQuery)).rejects.toBeInstanceOf(QueryNotRegisteredError);
    });

    // eslint-disable-next-line jest/prefer-expect-assertions,jest/expect-expect
    it('accepts a query with handler', async () => {
        const handledQuery = new HandledQuery(),
            myQueryHandler = new MyQueryHandler(),
            queryHandlersInformation = new QueryHandlersInformation([myQueryHandler]),
            queryBus = new InMemoryQueryBus(queryHandlersInformation);

        await queryBus.ask(handledQuery);
    });
});

/**
 * @author Telefonica
 * @description This class is an implementation for a query bus managed in memory
 */

import { QueryBus } from '@shared/domain/bus/query/query-bus';
import QueryHandlersInformation from '@shared/infrastructure/bus/query/queryHandlersInformation';
import Query from '@shared/domain/bus/query/query';
import { Response } from '@shared/domain/bus/query/response';

export default class InMemoryQueryBus implements QueryBus {
    private queryHandlersInformation: QueryHandlersInformation;

    constructor(queryHandlersInformation: QueryHandlersInformation) {
        this.queryHandlersInformation = queryHandlersInformation;
    }

    async ask<R extends Response>(query: Query): Promise<R> {
        const handler = this.queryHandlersInformation.search(query);

        return handler.handle(query) as Promise<R>;
    }
}

/**
 * @author Telefonica
 * @description This class allow us to manage query handlers subscription information
 */

import Query from '@shared/domain/bus/query/query';
import { QueryHandler } from '@shared/domain/bus/query/query-handler';
import { Response } from '@shared/domain/bus/query/response';
import QueryNotRegisteredError from '@shared/domain/bus/query/query-not-registered-error';

export default class QueryHandlersInformation {
    private queryHandlersMap: Map<Query, QueryHandler<Query, Response>>;

    constructor(queryHandlers: Array<QueryHandler<Query, Response>>) {
        this.queryHandlersMap = this.formatHandlers(queryHandlers);
    }

    // eslint-disable-next-line class-methods-use-this
    private formatHandlers(queryHandlers: Array<QueryHandler<Query, Response>>): Map<Query, QueryHandler<Query, Response>> {
        const handlersMap = new Map();

        queryHandlers.forEach((queryHandler) => {
            handlersMap.set(queryHandler.subscribedTo(), queryHandler);
        });

        return handlersMap;
    }

    public search(query: Query): QueryHandler<Query, Response> {
        const queryHandler = this.queryHandlersMap.get(query.constructor);

        if (!queryHandler) {
            throw new QueryNotRegisteredError(query);
        }

        return queryHandler;
    }
}

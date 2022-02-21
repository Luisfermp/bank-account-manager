/**
 * @author Telefonica
 * @description This error is thrown whenever a query hasn't got a query handler to be managed
 */

import Query from '@shared/domain/bus/query/query';

export default class QueryNotRegisteredError extends Error {
    constructor(query: Query) {
        super(`The query <${query.constructor.name}> hasn't a query handler associated`);
    }
}

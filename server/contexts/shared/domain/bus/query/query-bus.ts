import Query from '@shared/domain/bus/query/query';
import { Response } from '@shared/domain/bus/query/response';

export interface QueryBus {
  ask<R extends Response>(query: Query): Promise<R>
}

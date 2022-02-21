import { Response } from '@shared/domain/bus/query/response';

interface FindAccountBalanceQueryResponse extends Response {
    id: number,
    balance: number,
    updatedAt: string,
}

export default FindAccountBalanceQueryResponse;

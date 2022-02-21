import { Response } from '@shared/domain/bus/query/response';

interface FindAccountSummaryQueryResponse extends Response {
    accountId: number,
    summary: {
        amount: number,
        balance: number,
        date: string
    }[],
}

export default FindAccountSummaryQueryResponse;

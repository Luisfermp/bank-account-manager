import BaseController from '@shared/infrastructure/infrastructure/express/baseController';
import { Request, Response } from 'express';
import FindAccountSummaryQueryHandler from '@backoffice/accounts/application/find/findAccountSummaryQueryHandler';
import FindAccountSummaryQuery from '@backoffice/accounts/application/find/findAccountSummaryQuery';

export default class GetAccountBalanceSummaryController extends BaseController {
    #handler: FindAccountSummaryQueryHandler;

    constructor(handler: FindAccountSummaryQueryHandler) {
        super();
        this.#handler = handler;
    }

    async runOperation(req: Request, res: Response): Promise<void> {
        const accountId = parseInt(req.params.id, 10),
            command = new FindAccountSummaryQuery({ accountId }),
            accountBalance = await this.#handler.handle(command);
        res.status(200).json(accountBalance).end();
    }
}

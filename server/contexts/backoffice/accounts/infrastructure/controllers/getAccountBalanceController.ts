import FindAccountBalanceQueryHandler from '@backoffice/accounts/application/find/findAccountBalanceQueryHandler';
import BaseController from '@shared/infrastructure/infrastructure/express/baseController';
import { Request, Response } from 'express';
import FindAccountBalanceQuery from '@backoffice/accounts/application/find/findAccountBalanceQuery';

export default class GetAccountBalanceController extends BaseController {
    #handler: FindAccountBalanceQueryHandler;

    constructor(handler: FindAccountBalanceQueryHandler) {
        super();
        this.#handler = handler;
    }

    async runOperation(req: Request, res: Response): Promise<void> {
        const accountId = parseInt(req.params.id, 10),
            command = new FindAccountBalanceQuery({ accountId }),
            accountBalance = await this.#handler.handle(command);
        res.status(200).json(accountBalance).end();
    }
}

import BaseController from '@shared/infrastructure/infrastructure/express/baseController';
import UpdateAccountBalanceCommandHandler from '@backoffice/accounts/application/update/updateAccountBalanceCommandHandler';
import { Request, Response } from 'express';
import UpdateAccountBalanceCommand from '@backoffice/accounts/application/update/updateAccountBalanceCommand';

export default class UpdateAccountBalanceController extends BaseController {
    #handler: UpdateAccountBalanceCommandHandler;

    constructor(handler: UpdateAccountBalanceCommandHandler) {
        super();
        this.#handler = handler;
    }

    async runOperation(req: Request, res: Response): Promise<void> {
        const accountId = parseInt(req.params.id, 10),
            { amount } = req.body,
            command = new UpdateAccountBalanceCommand({ accountId, amount });
        await this.#handler.handle(command);
        res.status(200).end();
    }
}

import BaseController from '@shared/infrastructure/infrastructure/express/baseController';
import UpdateBalanceCommandHandler from '@backoffice/accounts/application/update/updateBalanceCommandHandler';
import { Request, Response } from 'express';
import UpdateBalanceCommand from '@backoffice/accounts/application/update/updateBalanceCommand';

export default class UpdateAccountBalanceController extends BaseController {
    #handler: UpdateBalanceCommandHandler;

    constructor(handler: UpdateBalanceCommandHandler) {
        super();
        this.#handler = handler;
    }

    async runOperation(req: Request, res: Response): Promise<void> {
        const accountId = parseInt(req.params.id, 10),
            { amount } = req.body,
            command = new UpdateBalanceCommand({ accountId, amount });
        await this.#handler.handle(command);
        res.status(200).end();
    }
}

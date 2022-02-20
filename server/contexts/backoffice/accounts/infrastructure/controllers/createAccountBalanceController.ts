import CreateBalanceCommand from '@backoffice/accounts/application/create/createBalanceCommand';
import CreateBalanceCommandHandler from '@backoffice/accounts/application/create/createBalanceCommandHandler';
import BaseController from '@shared/infrastructure/infrastructure/controller/baseController';
import { Request, Response } from 'express';

export default class CreateAccountBalanceController extends BaseController {
    #handler: CreateBalanceCommandHandler;

    constructor(handler: CreateBalanceCommandHandler) {
        super();
        this.#handler = handler;
    }

    async runOperation(req: Request, res: Response): Promise<void> {
        const accountId = parseInt(req.params.id, 10),
            amount = req.body.balance,
            command = new CreateBalanceCommand({ accountId, balance: amount });
        await this.#handler.handle(command);
        res.status(201).end();
    }
}

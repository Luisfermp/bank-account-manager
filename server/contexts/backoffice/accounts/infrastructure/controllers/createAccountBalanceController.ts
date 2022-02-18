import CreateBalanceCommand from '@backoffice/accounts/application/create/createBalanceCommand';
import CreateBalanceCommandHandler from '@backoffice/accounts/application/create/createBalanceCommandHandler';
import { Request, Response } from 'express';

export default class CreateAccountBalanceController {
    #handler: CreateBalanceCommandHandler;

    constructor(handler: CreateBalanceCommandHandler) {
        this.#handler = handler;
    }

    async run(req: Request, res: Response): Promise<void> {
        const accountId = parseInt(req.params.id, 10),
            amount = req.body.balance,
            command = new CreateBalanceCommand({ accountId, balance: amount });
        await this.#handler.handle(command);
        res.status(201).end();
    }
}

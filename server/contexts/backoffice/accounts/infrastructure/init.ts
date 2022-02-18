import UpdateAccountBalanceController from '@backoffice/accounts/infrastructure/controllers/updateAccountBalanceController';
import BalanceUpdater from '@backoffice/accounts/application/update/balanceUpdater';
import UpdateBalanceCommandHandler from '@backoffice/accounts/application/update/updateBalanceCommandHandler';
import express, { Router } from 'express';
import AccountRepository from '@backoffice/accounts/domain/accountRepository';
import BalanceCreator from '@backoffice/accounts/application/create/balanceCreator';
import CreateBalanceCommandHandler from '@backoffice/accounts/application/create/createBalanceCommandHandler';
import { EventBus } from '@shared/domain/bus/event/eventBus';
import CreateAccountBalanceController from '@backoffice/accounts/infrastructure/controllers/createAccountBalanceController';

export default function initAccountInfra(
    repository: AccountRepository,
    bus: EventBus
): Router {
    const creator = new BalanceCreator(repository, bus),
        updater = new BalanceUpdater(repository, bus),
        createBalanceCommandHandler = new CreateBalanceCommandHandler(creator),
        createBalanceController = new CreateAccountBalanceController(
            createBalanceCommandHandler
        ),
        updateAcountBalanceCommandHandler = new UpdateBalanceCommandHandler(updater),
        updateAccountBalanceController = new UpdateAccountBalanceController(updateAcountBalanceCommandHandler);

    return express
        .Router()
        .post(
            '/api/v1/accounts/:id',
            createBalanceController.run.bind(createBalanceController)
        )
        .put(
            '/api/v1/accounts/:id',
            updateAccountBalanceController.run.bind(updateAccountBalanceController)
        );
}

import UpdateAccountBalanceController from '@backoffice/accounts/infrastructure/controllers/updateAccountBalanceController';
import AccountBalanceUpdater from '@backoffice/accounts/application/update/accountBalanceUpdater';
import UpdateBalanceCommandHandler from '@backoffice/accounts/application/update/updateBalanceCommandHandler';
import express, { Router } from 'express';
import AccountRepository from '@backoffice/accounts/domain/accountRepository';
import AccountBalanceCreator from '@backoffice/accounts/application/create/accountBalanceCreator';
import CreateBalanceCommandHandler from '@backoffice/accounts/application/create/createBalanceCommandHandler';
import { EventBus } from '@shared/domain/bus/event/eventBus';
import CreateAccountBalanceController from '@backoffice/accounts/infrastructure/controllers/createAccountBalanceController';

export default function initAccountInfra(
    repository: AccountRepository,
    bus: EventBus
): Router {
    const creator = new AccountBalanceCreator(repository, bus),
        updater = new AccountBalanceUpdater(repository, bus),
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

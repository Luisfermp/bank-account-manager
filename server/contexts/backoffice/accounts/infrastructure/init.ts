import FindAccountBalanceQueryHandler from '@backoffice/accounts/application/find/findAccountBalanceQueryHandler';
import AccountBalanceFinder from '@backoffice/accounts/application/find/accountBalanceFinder';
import UpdateAccountBalanceController from '@backoffice/accounts/infrastructure/controllers/updateAccountBalanceController';
import AccountBalanceUpdater from '@backoffice/accounts/application/update/accountBalanceUpdater';
import UpdateAccountBalanceCommandHandler from '@backoffice/accounts/application/update/updateAccountBalanceCommandHandler';
import express, { Router } from 'express';
import AccountRepository from '@backoffice/accounts/domain/accountRepository';
import AccountBalanceCreator from '@backoffice/accounts/application/create/accountBalanceCreator';
import CreateBalanceCommandHandler from '@backoffice/accounts/application/create/createBalanceCommandHandler';
import { EventBus } from '@shared/domain/bus/event/eventBus';
import CreateAccountBalanceController from '@backoffice/accounts/infrastructure/controllers/createAccountBalanceController';
import GetAccountBalanceController from '@backoffice/accounts/infrastructure/controllers/getAccountBalanceController';

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
        updateAcountBalanceCommandHandler = new UpdateAccountBalanceCommandHandler(updater),
        updateAccountBalanceController = new UpdateAccountBalanceController(updateAcountBalanceCommandHandler),
        accountBalanceFinder = new AccountBalanceFinder(repository),
        findAccountBalanceQueryHandler = new FindAccountBalanceQueryHandler(accountBalanceFinder),
        getAccountBalanceController = new GetAccountBalanceController(findAccountBalanceQueryHandler);

    return express
        .Router()
        .get(
            '/api/v1/accounts/:id',
            getAccountBalanceController.run.bind(getAccountBalanceController)
        )
        .post(
            '/api/v1/accounts/:id',
            createBalanceController.run.bind(createBalanceController)
        )
        .put(
            '/api/v1/accounts/:id',
            updateAccountBalanceController.run.bind(updateAccountBalanceController)
        );
}

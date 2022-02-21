import FindAccountBalanceQueryHandler from '@backoffice/accounts/application/find/findAccountBalanceQueryHandler';
import AccountBalanceFinder from '@backoffice/accounts/application/find/accountBalanceFinder';
import UpdateAccountBalanceController from '@backoffice/accounts/infrastructure/controllers/updateAccountBalanceController';
import AccountBalanceUpdater from '@backoffice/accounts/application/update/accountBalanceUpdater';
import UpdateAccountBalanceCommandHandler from '@backoffice/accounts/application/update/updateAccountBalanceCommandHandler';
import express, { Router } from 'express';
import AccountRepository from '@backoffice/accounts/domain/accountRepository';
import AccountBalanceCreator from '@backoffice/accounts/application/create/accountBalanceCreator';
import CreateBalanceCommandHandler from '@backoffice/accounts/application/create/createBalanceCommandHandler';
import CreateAccountBalanceController from '@backoffice/accounts/infrastructure/controllers/createAccountBalanceController';
import GetAccountBalanceController from '@backoffice/accounts/infrastructure/controllers/getAccountBalanceController';
import SaveAccountSummaryOnAccountBalanceSaved from '@backoffice/accounts/application/save/saveAccountSummaryOnAccountBalanceSaved';
import AccountSummarySaver from '@backoffice/accounts/application/save/accountSummarySaver';
import AccountSummaryFinder from '@backoffice/accounts/application/find/accountSummaryFinder';
import FindAccountSummaryQueryHandler from '@backoffice/accounts/application/find/findAccountSummaryQueryHandler';
import GetAccountBalanceSummaryController from '@backoffice/accounts/infrastructure/controllers/getAccountBalanceSummaryController';
import InMemorySyncEventBus from '@shared/infrastructure/bus/event/inMemorySyncEventBus';

export default function initAccountInfra(
    repository: AccountRepository,
    bus: InMemorySyncEventBus
): Router {
    const creator = new AccountBalanceCreator(repository, bus),
        updater = new AccountBalanceUpdater(repository, bus),
        createBalanceCommandHandler = new CreateBalanceCommandHandler(creator),
        createBalanceController = new CreateAccountBalanceController(
            createBalanceCommandHandler
        ),
        updateAccountBalanceCommandHandler = new UpdateAccountBalanceCommandHandler(updater),
        updateAccountBalanceController = new UpdateAccountBalanceController(updateAccountBalanceCommandHandler),
        accountBalanceFinder = new AccountBalanceFinder(repository),
        findAccountBalanceQueryHandler = new FindAccountBalanceQueryHandler(accountBalanceFinder),
        getAccountBalanceController = new GetAccountBalanceController(findAccountBalanceQueryHandler),
        accountSummaryFinder = new AccountSummaryFinder(repository),
        findAccountSummaryQueryHandler = new FindAccountSummaryQueryHandler(accountSummaryFinder),
        getAccountBalanceSummaryController = new GetAccountBalanceSummaryController(findAccountSummaryQueryHandler),
        accountSummarySaver = new AccountSummarySaver(repository),
        saveAccountSummaryOnAccountBalanceSaver = new SaveAccountSummaryOnAccountBalanceSaved(accountSummarySaver);

    bus.addSubscribers([saveAccountSummaryOnAccountBalanceSaver]);

    return express
        .Router()
        .get(
            '/api/v1/accounts/:id',
            getAccountBalanceController.run.bind(getAccountBalanceController)
        )
        .get(
            '/api/v1/accounts/:id/summary',
            getAccountBalanceController.run.bind(getAccountBalanceSummaryController)
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

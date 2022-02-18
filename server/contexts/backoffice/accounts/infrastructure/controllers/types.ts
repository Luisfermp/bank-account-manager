import CreateAccountBalanceController from '@backoffice/accounts/infrastructure/controllers/createAccountBalanceController';
import UpdateAccountBalanceController from '@backoffice/accounts/infrastructure/controllers/updateAccountBalanceController';

export type AccountExpressControllers =
  | CreateAccountBalanceController
  | UpdateAccountBalanceController;

import Account from '@backoffice/accounts/domain/account';
import AccountId from '@backoffice/accounts/domain/accountId';
import AccountSummary from '@backoffice/accounts/domain/accountSummary';
import { Nullable } from '@shared/domain/nullable';

interface AccountRepository {
  find(accountId: AccountId): Promise<Nullable<Account>>
  save(account: Account): Promise<void>
  saveSummary(summary: AccountSummary): Promise<void>
  findSummary(accountId: AccountId): Promise<Nullable<AccountSummary>>
}

export default AccountRepository;

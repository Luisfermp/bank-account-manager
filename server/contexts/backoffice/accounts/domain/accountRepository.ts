import Account from '@backoffice/accounts/domain/account';
import AccountId from '@backoffice/accounts/domain/accountId';
import { Nullable } from '@shared/domain/nullable';

interface AccountRepository {
  get(accountId: AccountId): Promise<Nullable<Account>>
  save(account: Account): Promise<void>
}

export default AccountRepository;

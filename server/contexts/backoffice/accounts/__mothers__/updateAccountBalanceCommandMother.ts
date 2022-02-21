import UpdateAccountBalanceCommand from '@backoffice/accounts/application/update/updateAccountBalanceCommand';
import AccountIdMother from '@backoffice/accounts/__mothers__/accountId.mother';
import AmountMother from '@backoffice/accounts/__mothers__/amount.mother';

export default class UpdateAccountBalanceCommandMother {
    static create(params: { accountId: number, amount: number}): UpdateAccountBalanceCommand {
        return new UpdateAccountBalanceCommand(params);
    }

    static random(): UpdateAccountBalanceCommand {
        return UpdateAccountBalanceCommandMother.create({
            accountId: AccountIdMother.random().value,
            amount: AmountMother.random().value
        });
    }

    static randomWithPositiveAmount(): UpdateAccountBalanceCommand {
        return UpdateAccountBalanceCommandMother.create({
            accountId: AccountIdMother.random().value,
            amount: AmountMother.randomPositive().value
        });
    }

    static randomWithNegativeAmount(): UpdateAccountBalanceCommand {
        return UpdateAccountBalanceCommandMother.create({
            accountId: AccountIdMother.random().value,
            amount: AmountMother.randomNegative().value
        });
    }
}

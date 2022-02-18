import UpdateBalanceCommand from '@backoffice/accounts/application/update/updateBalanceCommand';
import AccountIdMother from '@backoffice/accounts/__mothers__/accountId.mother';
import AmountMother from '@backoffice/accounts/__mothers__/amount.mother';

export default class UpdateAccountBalanceCommandMother {
    static create(params: { accountId: number, amount: number}): UpdateBalanceCommand {
        return new UpdateBalanceCommand(params);
    }

    static random(): UpdateBalanceCommand {
        return UpdateAccountBalanceCommandMother.create({
            accountId: AccountIdMother.random().value,
            amount: AmountMother.random().value
        });
    }

    static randomWithPositiveAmount(): UpdateBalanceCommand {
        return UpdateAccountBalanceCommandMother.create({
            accountId: AccountIdMother.random().value,
            amount: AmountMother.randomPositive().value
        });
    }

    static randomWithNegativeAmount(): UpdateBalanceCommand {
        return UpdateAccountBalanceCommandMother.create({
            accountId: AccountIdMother.random().value,
            amount: AmountMother.randomNegative().value
        });
    }
}

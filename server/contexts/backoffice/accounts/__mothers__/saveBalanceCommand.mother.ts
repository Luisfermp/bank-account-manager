import SaveBalanceCommand from '@backoffice/accounts/application/save/saveBalanceCommand';
import AccountIdMother from '@backoffice/accounts/__mothers__/accountId.mother';
import AmountMother from '@backoffice/accounts/__mothers__/amount.mother';

export default class SaveBalanceCommandMother {
    static create(params: { accountId: string, amount: number}): SaveBalanceCommand {
        return new SaveBalanceCommand(params);
    }

    static random(): SaveBalanceCommand {
        return SaveBalanceCommandMother.create({
            accountId: AccountIdMother.random().value,
            amount: AmountMother.random().value
        });
    }

    static randomWithPositiveAmount(): SaveBalanceCommand {
        return SaveBalanceCommandMother.create({
            accountId: AccountIdMother.random().value,
            amount: AmountMother.randomPositive().value
        });
    }

    static randomWithNegativeAmount(): SaveBalanceCommand {
        return SaveBalanceCommandMother.create({
            accountId: AccountIdMother.random().value,
            amount: AmountMother.randomNegative().value
        });
    }
}

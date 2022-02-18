import AccountIdMother from '@backoffice/accounts/__mothers__/accountId.mother';
import AmountMother from '@backoffice/accounts/__mothers__/amount.mother';
import CreateBalanceCommand from '@backoffice/accounts/application/create/createBalanceCommand';

export default class CreateBalanceCommandMother {
    static create(params: { accountId: number, amount: number}): CreateBalanceCommand {
        return new CreateBalanceCommand(
            params
        );
    }

    static random(): CreateBalanceCommand {
        return CreateBalanceCommandMother.create({
            accountId: AccountIdMother.random().value,
            amount: AmountMother.random().value
        });
    }

    static randomWithPositiveAmount(): CreateBalanceCommand {
        return CreateBalanceCommandMother.create({
            accountId: AccountIdMother.random().value,
            amount: AmountMother.randomPositive().value
        });
    }

    static randomWithNegativeAmount(): CreateBalanceCommand {
        return CreateBalanceCommandMother.create({
            accountId: AccountIdMother.random().value,
            amount: AmountMother.randomNegative().value
        });
    }
}

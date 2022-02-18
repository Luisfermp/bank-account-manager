import AccountIdMother from '@backoffice/accounts/__mothers__/accountId.mother';
import AmountMother from '@backoffice/accounts/__mothers__/amount.mother';
import CreateBalanceCommand from '@backoffice/accounts/application/create/createBalanceCommand';

export default class CreateAccountBalanceCommandMother {
    static create(params: { accountId: number, balance: number}): CreateBalanceCommand {
        return new CreateBalanceCommand(
            params
        );
    }

    static random(): CreateBalanceCommand {
        return CreateAccountBalanceCommandMother.create({
            accountId: AccountIdMother.random().value,
            balance: AmountMother.random().value
        });
    }

    static randomWithPositiveAmount(): CreateBalanceCommand {
        return CreateAccountBalanceCommandMother.create({
            accountId: AccountIdMother.random().value,
            balance: AmountMother.randomPositive().value
        });
    }

    static randomWithNegativeAmount(): CreateBalanceCommand {
        return CreateAccountBalanceCommandMother.create({
            accountId: AccountIdMother.random().value,
            balance: AmountMother.randomNegative().value
        });
    }
}

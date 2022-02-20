import AccountId from '@backoffice/accounts/domain/accountId';
import AccountSummary, { Summary } from '@backoffice/accounts/domain/accountSummary';
import AccountIdMother from '@backoffice/accounts/__mothers__/accountId.mother';
import Repeater from '@shared/__mothers__/repeater.mother';
import DatetimeValueObjectMother from '@shared/__mothers__/datetimeValueObject.mother';
import AmountMother from '@backoffice/accounts/__mothers__/amount.mother';
import BalanceMother from '@backoffice/accounts/__mothers__/balance.mother';

export default class AccountSummaryMother {
    static create(accountId: AccountId, summary: Summary[]): AccountSummary {
        return new AccountSummary(accountId, summary);
    }

    static fromPrimitives({
        accountId,
        summary
    }: { accountId: number, summary: { date: string, amount: number, balance: number }[]}): AccountSummary {
        return AccountSummary.fromPrimitives({
            accountId,
            summary
        });
    }

    static random(): AccountSummary {
        return AccountSummaryMother.create(
            AccountIdMother.random(),
            Repeater.random(() => ({
                date: DatetimeValueObjectMother.random(),
                amount: AmountMother.random(),
                balance: BalanceMother.random()
            }))
        );
    }
}

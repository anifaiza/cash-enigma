/* eslint-disable max-len */
const cashOut = {};

const cashOutNaturalConfig = {
    percents: 0.3,
    week_limit: { amount: 1000, currency: 'EUR' },
};

const cashOutJuridicalConfig = { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } };

cashOut.calculateCommissionNatural = (transactionAmount, prevCashOutAmount) => {
    let commissionToBeCalculatedOn = transactionAmount;
    let commission = 0;
    if (prevCashOutAmount === 0) {
        if (transactionAmount > cashOutNaturalConfig.week_limit.amount) {
            // eslint-disable-next-line prettier/prettier
            commissionToBeCalculatedOn -= cashOutNaturalConfig.week_limit.amount;
            commission = (commissionToBeCalculatedOn * cashOutNaturalConfig.percents) / 100;
        } else {
            commission = 0;
        }
    } else if (
        prevCashOutAmount < cashOutNaturalConfig.week_limit.amount &&
        prevCashOutAmount + transactionAmount > cashOutNaturalConfig.week_limit.amount
    ) {
        // eslint-disable-next-line prettier/prettier
        commissionToBeCalculatedOn = prevCashOutAmount + transactionAmount - cashOutNaturalConfig.week_limit.amount;
        commission = (commissionToBeCalculatedOn * cashOutNaturalConfig.percents) / 100;
    } else if (prevCashOutAmount >= cashOutNaturalConfig.week_limit.amount) {
        commission = (commissionToBeCalculatedOn * cashOutNaturalConfig.percents) / 100;
    } else {
        commission = 0;
    }
    commission = Math.ceil(commission * 100) / 100;
    console.log(commission.toFixed(2));
};

cashOut.calculateCommissionJuridical = (transactionAmount) => {
    let commission = transactionAmount * (cashOutJuridicalConfig.percents / 100);
    if (commission < cashOutJuridicalConfig.min.amount) {
        commission = cashOutJuridicalConfig.min.amount;
    }
    commission = Math.ceil(commission * 100) / 100;
    console.log(commission.toFixed(2));
};

module.exports = cashOut;

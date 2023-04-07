const cashIn = {};

const cashInConfig = {
    percents: 0.03,
    max: {
        amount: 5,
        currency: 'EUR',
    },
};

cashIn.calculateCommission = (transactionAmount) => {
    let commission = transactionAmount * (cashInConfig.percents / 100);
    if (commission > cashInConfig.max.amount) {
        commission = cashInConfig.max.amount;
    }
    commission = Math.ceil(commission * 100) / 100;
    console.log(commission.toFixed(2));
};

module.exports = cashIn;

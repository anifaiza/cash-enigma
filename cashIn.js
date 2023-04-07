const cashIn = {};

const cashInConfig = {
    percents: 0.03,
    max: {
        amount: 5,
        currency: 'EUR',
    },
};

cashIn.calculateCommission = (transactionItem) => {
    let commission = transactionItem.operation.amount * (cashInConfig.percents / 100);
    if (commission > cashInConfig.max.amount) {
        commission = cashInConfig.max.amount;
    }
    console.log(commission.toFixed(2));
};

module.exports = cashIn;

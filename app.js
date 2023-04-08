const fs = require('fs');
const moment = require('moment');
const cashIn = require('./cashIn');
const cashOut = require('./cashOut');

const app = {};

moment.updateLocale('en', {
    week: {
        dow: 1, // Monday is the first day of the week
    },
});

app.outputComission = (filename) => {
    const input = fs.readFileSync(filename);
    const inputArray = JSON.parse(input);
    let dateToCheckWith = inputArray[0].date;
    const usersCashOutInfo = {};
    // eslint-disable-next-line array-callback-return
    inputArray.map((item) => {
        // eslint-disable-next-line no-unused-expressions
        if (item.type === 'cash_in') {
            cashIn.calculateCommission(item.operation.amount);
        } else if (item.user_type === 'natural') {
            if (!usersCashOutInfo[item.user_id]) {
                usersCashOutInfo[item.user_id] = item.operation.amount;
                cashOut.calculateCommissionNatural(item.operation.amount, 0);
            } else if (moment(item.date).isSame(dateToCheckWith, 'week')) {
                cashOut.calculateCommissionNatural(
                    item.operation.amount,
                    usersCashOutInfo[item.user_id],
                );
                usersCashOutInfo[item.user_id] += item.operation.amount;
            } else if (!moment(item.date).isSame(dateToCheckWith, 'week')) {
                usersCashOutInfo[item.user_id] = item.operation.amount;
                cashOut.calculateCommissionNatural(item.operation.amount, 0);
                dateToCheckWith = item.date;
            }
        } else {
            cashOut.calculateCommissionJuridical(item.operation.amount);
        }
    });
};

const args = process.argv;

app.outputComission(args[2]);

module.exports = app;

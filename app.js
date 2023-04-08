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

app.outputComission = (inputArray) => {
    let dateToCheckWith = inputArray[0].date;
    const usersCashOutInfo = {};

    inputArray.map((item) => {
        if (item.type === 'cash_in') { 
            //in case of cash in 
            cashIn.calculateCommission(item.operation.amount);
        } else if (item.user_type === 'natural') {
            //in case of cash out natural
            if (!usersCashOutInfo[item.user_id]) {
                //if the user has no previous cash out history
                usersCashOutInfo[item.user_id] = item.operation.amount;
                cashOut.calculateCommissionNatural(item.operation.amount, 0);
            } else if (moment(item.date).isSame(dateToCheckWith, 'week')) {
                //if the user has cash out history in the same week
                cashOut.calculateCommissionNatural(item.operation.amount, usersCashOutInfo[item.user_id]);
                usersCashOutInfo[item.user_id] += item.operation.amount;
            } else if (!moment(item.date).isSame(dateToCheckWith, 'week')) {
                //if the user has no cash out history in the same week
                usersCashOutInfo[item.user_id] = item.operation.amount;
                cashOut.calculateCommissionNatural(item.operation.amount, 0);
                dateToCheckWith = item.date;
            }
        } else {
            //in case of cash out juridical
            cashOut.calculateCommissionJuridical(item.operation.amount);
        }
    });
};

const args = process.argv;
const input = fs.readFileSync(args[2]);
const inputArray = JSON.parse(input);
app.outputComission(inputArray);

module.exports = app;

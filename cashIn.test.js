/* eslint-disable no-undef */
const cashIn = require('./cashIn');

test('calculates cashIn commission correctly', () => {
    expect(cashIn.calculateCommission(500)).toBe(console.log(0.15));
    expect(cashIn.calculateCommission(5000)).toBe(console.log(1.5));
    expect(cashIn.calculateCommission(20000)).toBe(console.log(5.0));
    expect(cashIn.calculateCommission(2550)).toBe(console.log(0.77));
});

/* eslint-disable no-undef */
const cashOut = require('./cashOut');

test('calculates cashOut commission for legal person correctly', () => {
    expect(cashOut.calculateCommissionJuridical(100)).toBe(console.log(0.5));
    expect(cashOut.calculateCommissionJuridical(5000)).toBe(console.log(15.0));
    expect(cashOut.calculateCommissionJuridical(275)).toBe(console.log(0.83));
});
test('calculates cashOut commission for legal person correctly', () => {
    expect(cashOut.calculateCommissionNatural(300, 0)).toBe(console.log(0.0));
    expect(cashOut.calculateCommissionNatural(700, 300)).toBe(console.log(0.0));
    expect(cashOut.calculateCommissionNatural(700, 1000)).toBe(console.log(2.1));
    expect(cashOut.calculateCommissionNatural(700, 0)).toBe(console.log(0.0));
    expect(cashOut.calculateCommissionNatural(700, 700)).toBe(console.log(1.2));
    expect(cashOut.calculateCommissionNatural(700, 1400)).toBe(console.log(2.1));
    expect(cashOut.calculateCommissionNatural(7000, 0)).toBe(console.log(18.0));
    expect(cashOut.calculateCommissionNatural(200, 7000)).toBe(console.log(0.6));
});

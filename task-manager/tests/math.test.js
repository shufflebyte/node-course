const {calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add} = require('../src/math');

// tip tests
test('sould calculate total with tip', () => {
    const total = calculateTip(10, .3);
    // if (total != 13) {
    //     throw new Error('Total should be 13. Got ' + total);
    // }
    expect(total).toBe(13); 
});

test('sould calculate total with default tip', () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5); 
});

// fahrenheit to celsius
test('should convert 32° F to  0°C', () => {
    const f = 32;
    const c = fahrenheitToCelsius(f)
    expect(c).toBe(0);
});

// celsius to fahrenheit
test('should convert 0°C to  32° F', () => {
    const c = 0;
    const f = celsiusToFahrenheit(c)
    expect(f).toBe(32);
});

// test('async test demo', () => {
//     setTimeout(() => {
//         expect(1).toBe(2);  // Invalid but says passed! and did not wait 2 sec
//     }, 2000);
// });

// use callback-parameter (here "done")
// test('async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2);  // Invalid but says passed! and did not wait 2 sec
//         done();
//     }, 2000);
// });

test('should add 2 numbers', (done) => {
    add(2,3).then((sum) => {
        expect(sum).toBe(5);
        done();
    });
});

test('should add 2 numbers async await', async () => {
    const sum = await add(10, 22);
    expect(sum).toBe(32);
});

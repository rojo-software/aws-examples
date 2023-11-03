const validatePayload = require('../validatePayload');

test('Validates conformant data', () => {
    const data = {
        id: 'ea9008de-7877-4116-bd04-5ff4ecbec096',
        name: 'Allan',
        age: 27
    }
    expect(validatePayload(data)).toEqual(true);
});

test('Rejects missing properties', () => {
    const data = {
        id: 'ea9008de-7877-4116-bd04-5ff4ecbec096',
        name: 'Allan'
    }
    expect(validatePayload(data)).toEqual(false);
});

test('Rejects additional properties', () => {
    const data = {
        id: 'ea9008de-7877-4116-bd04-5ff4ecbec096',
        name: 'Allan',
        age: 27,
        address: '21 Church St'
    }
    expect(validatePayload(data)).toEqual(false);
});
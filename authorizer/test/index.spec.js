const index = require('../index');

const GOOD_USER = 'andy';
const GOOD_PASS = 'password123';

const ANOTHER_GOOD_USER ='bob';
const ANOTHER_GOOD_PASS = 'password789';

const credentials = {};

credentials[GOOD_USER] = {
    password: GOOD_PASS
};

credentials[ANOTHER_GOOD_USER] = {
    password: ANOTHER_GOOD_PASS
};

process.env.CREDENTIALS = JSON.stringify(credentials);

test('allow', async() => {

    const event = {
        headers: {
            authorization: 'Basic ' + btoa(`${GOOD_USER}:${GOOD_PASS}`)
        }
    }

    expect(index.handler(event)).resolves.toEqual({isAuthorized:true});
});

test('allow alternative user', async() => {

    const event = {
        headers: {
            authorization: 'Basic ' + btoa(`${ANOTHER_GOOD_USER}:${ANOTHER_GOOD_PASS}`)
        }
    }

    expect(index.handler(event)).resolves.toEqual({isAuthorized:true});
});

test('deny', async() => {

    const event = {
        headers: {
            authorization: 'Basic ' + btoa(`${GOOD_USER}:foobar`)
        }
    }

    expect(index.handler(event)).resolves.toEqual({isAuthorized:false});

});
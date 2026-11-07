export const testData = {

    //test login page
    validUser: {
        username: 'standard_user',
        password: 'secret_sauce'
    },

    invalidUser: {
        username: 'wrong_user',
        password: 'wrong_password'
    },

    emptyUser: {
        username: '',
        password: ''
    },

    expectedMessages: {
        invalidCredentials:
            'Epic sadface: Username and password do not match any user in this service',

        missingUsername:
            'Epic sadface: Username is required'
    },

    //Smoke test data for checkout process
    user: {
        username: 'standard_user',
        password: 'secret_sauce'
    },

    checkout: {
        firstName: 'Gayan',
        lastName: 'Jayawardhana',
        postalCode: '10100'
    },

    product: {
        name: 'Sauce Labs Backpack'
    }

};
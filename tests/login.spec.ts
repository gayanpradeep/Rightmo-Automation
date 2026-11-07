import { test, expect } from '../fixtures/baseFixture';

import { testData } from '../test-data/testData';

test.describe('SauceDemo - Login Functionality', () => {

    test.beforeEach(async ({ loginPage }) => {

        await loginPage.navigate();

        await loginPage.verifyLoginPage();

    });

    // TC_LOGIN_001 - Valid Login
    test('TC_LOGIN_001 - Verify login with valid credentials',
        async ({ loginPage }) => {

            await loginPage.login(
                testData.validUser.username,
                testData.validUser.password
            );

            await loginPage.verifyLoginSuccess();

        }
    );

    // TC_LOGIN_002 - Invalid Login
    test('TC_LOGIN_002 - Verify login with invalid credentials',
        async ({ loginPage }) => {

            await loginPage.login(
                testData.invalidUser.username,
                testData.invalidUser.password
            );

            await loginPage.verifyErrorMessage(
                testData.expectedMessages.invalidCredentials
            );

        }
    );

    // TC_LOGIN_003 - Empty Credentials
    test('TC_LOGIN_003 - Verify login with empty credentials',
        async ({ loginPage }) => {

            await loginPage.clickLogin();

            await loginPage.verifyErrorMessage(
                testData.expectedMessages.missingUsername
            );

        }
    );

});
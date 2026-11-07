import { test } from '../fixtures/baseFixture';
import { testData } from '../test-data/testData';

test.describe('SauceDemo - Swag Labs', () => {

    test('TC_SMk_001 - Verify successful login and checkout',
        async ({
            loginPage,
            inventoryPage,
            cartPage,
            checkoutPage,
            checkoutCompletePage
        }) => {

            // Step 1: Open SauceDemo login page
            await loginPage.navigate();

            // Step 2: Login with valid credentials
            await loginPage.login(
                testData.user.username,
                testData.user.password
            );

            // Step 3: Verify successful login
            await loginPage.verifySuccessfulLogin();

            // Step 4: Verify inventory page and products
            await inventoryPage.verifyInventoryPage();
            await inventoryPage.verifyProductsVisible();

            // Step 5: Add product to cart
            await inventoryPage.addProductToCart(
                testData.product.name
            );

            // Step 6: Verify cart badge
            await inventoryPage.verifyCartBadge(1);

            // Step 7: Open shopping cart
            await inventoryPage.openCart();

            // Step 8: Verify cart page and selected product
            await cartPage.verifyCartPage();

            await cartPage.verifyProductInCart(
                testData.product.name
            );

            // Step 9: Proceed to checkout
            await cartPage.proceedToCheckout();

            // Step 10: Verify checkout information page
            await checkoutPage.verifyCheckoutInformationPage();

            // Step 11: Enter customer information
            await checkoutPage.fillCheckoutInformation(
                testData.checkout.firstName,
                testData.checkout.lastName,
                testData.checkout.postalCode
            );

            // Step 12: Continue to order overview
            await checkoutPage.continueToOverview();

            // Step 13: Verify order details
            await checkoutPage.verifyOrderOverview(
                testData.product.name
            );

            // Step 14: Finish the order
            await checkoutPage.finishOrder();

            // Step 15: Verify successful order completion
            await checkoutCompletePage.verifyOrderSuccess();

            // Step 16: Logout
            await checkoutCompletePage.logout();

            // Step 17: Verify logout successfully
            await checkoutCompletePage.verifyLogout();

        }
    );

});
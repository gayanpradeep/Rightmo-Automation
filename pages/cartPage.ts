import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.cartItems = page.locator('.cart_item');

        this.checkoutButton = page.getByRole('button', {
            name: 'Checkout'
        });
    }

    async verifyCartPage(): Promise<void> {
        await expect(this.page).toHaveURL(/cart.html/);
    }

    async verifyProductInCart(productName: string): Promise<void> {
        const product = this.cartItems.filter({
            hasText: productName
        });

        await expect(product).toBeVisible();
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }
}
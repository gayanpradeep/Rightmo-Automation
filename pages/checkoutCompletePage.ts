import { Page, Locator, expect } from '@playwright/test';

export class CheckoutCompletePage {
    readonly page: Page;
    readonly completeHeader: Locator;
    readonly menuButton: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.completeHeader = page.locator('.complete-header');

        // this.menuButton = page.getByRole('button', {
        //     name: 'Open Menu'
        // });

        // this.logoutLink = page.getByRole('link', {
        //     name: 'Logout'
        // });
        
        this.menuButton = page.locator('#react-burger-menu-btn');

        this.logoutLink = page.locator('#logout_sidebar_link');
    }

    async verifyOrderSuccess(): Promise<void> {
        await expect(this.page)
            .toHaveURL(/checkout-complete.html/);

        await expect(this.completeHeader)
            .toHaveText('Thank you for your order!');
    }

    async logout(): Promise<void> {
        await this.menuButton.click();
        await this.logoutLink.click();
    }

    async verifyLogout(): Promise<void> {
        await expect(this.page)
            .toHaveURL(/saucedemo.com\/?$/);

        await expect(
            this.page.locator('#login-button')
        ).toBeVisible();
    }
}
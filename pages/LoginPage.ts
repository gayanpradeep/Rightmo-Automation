import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {

        this.page = page;

        // Locators
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    // Navigate to login page
    async navigate(): Promise<void> {
        await this.page.goto('/');
    }

    // Enter username
    async enterUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    // Enter password
    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    // Click login button
    async clickLogin(): Promise<void> {
        await this.loginButton.click();
    }

    // Login action
    async login(username: string, password: string): Promise<void> {

        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    // Verify successful login
    async verifyLoginSuccess(): Promise<void> {

        await expect(this.page).toHaveURL(/inventory.html/);
        await expect(this.page.locator('.title')).toHaveText('Products');
    }

    // Verify error message
    async verifyErrorMessage(expectedMessage: string): Promise<void> {

        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(expectedMessage);
    }

    // Verify login page is displayed
    async verifyLoginPage(): Promise<void> {

        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }
}
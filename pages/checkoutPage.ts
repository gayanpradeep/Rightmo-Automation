import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');

        this.continueButton = page.getByRole('button', {
            name: 'Continue'
        });

        this.finishButton = page.getByRole('button', {
            name: 'Finish'
        });
    }

    async verifyCheckoutInformationPage(): Promise<void> {
        await expect(this.page)
            .toHaveURL(/checkout-step-one.html/);
    }

    async fillCheckoutInformation(
        firstName: string,
        lastName: string,
        postalCode: string
    ): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueToOverview(): Promise<void> {
        await this.continueButton.click();

        await expect(this.page)
            .toHaveURL(/checkout-step-two.html/);
    }

    async verifyOrderOverview(productName: string): Promise<void> {
        await expect(
            this.page.locator('.inventory_item_name')
        ).toHaveText(productName);
    }

    async finishOrder(): Promise<void> {
        await this.finishButton.click();
    }
}
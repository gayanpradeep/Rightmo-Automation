import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.inventoryItems = page.locator('.inventory_item');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
    }

    async verifyInventoryPage(): Promise<void> {
        await expect(this.page.locator('.title'))
            .toHaveText('Products');
    }

    async verifyProductsVisible(): Promise<void> {
        await expect(this.inventoryItems.first()).toBeVisible();
        await expect(this.inventoryItems).not.toHaveCount(0);
    }

    async addProductToCart(productName: string): Promise<void> {
        const product = this.inventoryItems.filter({
            hasText: productName
        });

        await expect(product).toBeVisible();

        await product.getByRole('button', {
            name: 'Add to cart'
        }).click();
    }

    async verifyCartBadge(expectedCount: number): Promise<void> {
        await expect(this.cartBadge)
            .toHaveText(String(expectedCount));
    }

    async openCart(): Promise<void> {
        await this.cartLink.click();
    }
}
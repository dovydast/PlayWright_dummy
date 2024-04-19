import { expect } from "@playwright/test"


export class CheckoutPage {
    constructor(page){
        this.page = page
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemove = page.locator('[data-qa="basket-card-remove-item"]')
        this.checkoutButton = page.locator('[data-qa="continue-to-checkout"]')

    }

    removeCheapestProduct = async () => {
        const itemsBeforeRemoval = await this.basketCards.count()
        const allPriceText = await this.basketItemPrice.allInnerTexts()

        const justNumbers = allPriceText.map((element) => {
            const removeDollarSign = element.replace('$','')
            return parseInt(removeDollarSign)
        })

        const smallestPrice = Math.min(justNumbers)
        const smallestPriceIndex = justNumbers.indexOf(smallestPrice)
        await this.basketItemRemove.nth(smallestPriceIndex).click()
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval -1)
    }

    continueToCheckout = async () => {
        await this.checkoutButton.click()
        await this.page.waitForURL(/\/login/, {timeout: 2000})
    }
}
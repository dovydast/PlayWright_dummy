import { isDesktopViewport } from "./utils/isDesktopViewport"

export class Navigation{

    constructor(page){
        this.page = page
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkOutLink = page.getByRole('link', {name: 'Checkout'})
        this.burgerNav = page.locator('[data-qa="burger-button"]')
    }

    getBasketCount = async () => {
        const text = await this.basketCounter.innerText()
        return parseInt(text)
    }

    goToCheckout = async () => {
        if  (!isDesktopViewport(this.page)) {
            await this.burgerNav.waitFor()
            await this.burgerNav.click()
        }
            await this.checkOutLink.waitFor()
            await this.checkOutLink.click()
            await this.page.waitForURL("/basket")
    }
}
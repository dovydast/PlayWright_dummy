export class Navigation{
    
    constructor(page){
        this.page = page
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkOutLink = page.getByRole('link', {name: 'Checkout'})
    }

    getBasketCount = async () => {
        //return number
        const text = await this.basketCounter.innerText()
        return parseInt(text)
    }

    goToCheckout = async () => {
        await this.checkOutLink.click()
        await this.page.waitForURL("/basket")
    }
}
export class DeliveryDetailsPage {
    constructor(page){
        this.page = page
        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]')
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]')
        this.streetInput = page.locator('[data-qa="delivery-address-street"]')
        this.postcodeInput = page.locator('[data-qa="delivery-postcode"]')
        this.cityInput = page.locator('[data-qa="delivery-city"]')
        this.selectOption = page.locator('[data-qa="country-dropdown"]')
        this.continueToPayment = page.locator('[data-qa="continue-to-payment-button"]')
    }

    fillDeliveryDetails = async (userAddress) => {
        await this.firstNameInput.fill(userAddress.firstName)
        await this.lastNameInput.fill(userAddress.lastName)
        await this.streetInput.fill(userAddress.street)
        await this.postcodeInput.fill(userAddress.postcode)
        await this.cityInput.fill(userAddress.city)
        await this.selectOption.selectOption(userAddress.country)
        await this.page.pause()
        await this.continueToPayment.click()
    }
}
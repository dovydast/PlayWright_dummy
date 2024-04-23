import { expect } from "@playwright/test"

export class DeliveryDetailsPage {
    constructor(page){
        this.page = page
        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]')
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]')
        this.streetInput = page.locator('[data-qa="delivery-address-street"]')
        this.postcodeInput = page.locator('[data-qa="delivery-postcode"]')
        this.cityInput = page.locator('[data-qa="delivery-city"]')
        this.selectOption = page.locator('[data-qa="country-dropdown"]')
        this.continueToPaymentButton = page.locator('[data-qa="continue-to-payment-button"]')
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPostcode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry= page.locator('[data-qa="saved-address-country"]')
    }

    fillDeliveryDetails = async (userAddress) => {
        await this.firstNameInput.fill(userAddress.firstName)
        await this.lastNameInput.fill(userAddress.lastName)
        await this.streetInput.fill(userAddress.street)
        await this.postcodeInput.fill(userAddress.postcode)
        await this.cityInput.fill(userAddress.city)
        await this.selectOption.selectOption(userAddress.country)
    }
    
    saveDetails =  async () => {
        const addressCountBeforeSaving = await this.savedAddressContainer.count()
        await this.saveAddressButton.click()
        await expect(this.savedAddressContainer).toHaveCount(addressCountBeforeSaving + 1)
        expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())
        expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue())
        expect(await this.savedAddressStreet.first().innerText()).toBe(await this.streetInput.inputValue())
        expect(await this.savedAddressCity.first().innerText()).toBe(await this.cityInput.inputValue())
        expect(await this.savedAddressPostcode.first().innerText()).toBe(await this.postcodeInput.inputValue())
        expect(await this.savedAddressCountry.first().innerText()).toBe(await this.selectOption.inputValue())
    }

    continueToPayment = async () => {
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, {timeout: 3000})
    }

}
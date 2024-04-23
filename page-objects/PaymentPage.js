import { expect } from "@playwright/test"
export class PaymentPage {
    constructor(page){
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountCodeInput = page.locator('[data-qa="discount-code-input"]')
        this.submitDiscount = page.locator('[data-qa="submit-discount-button"]')
        this.discountActivateMessage = page.locator('[data-qa="discount-active-message"]')
        this.totalIncludinDiscount = page.locator('[data-qa="total-with-discount-value"]')
        this.totalPrice = page.locator('[data-qa="total-value"]')

        this.cardOwner = page.locator('[data-qa="credit-card-owner"]')
        this.cardNumber = page.locator('[data-qa="credit-card-number"]')
        this.validUntil = page.locator('[data-qa="valid-until"]')
        this.cvc = page.locator('[data-qa="credit-card-cvc"]')
        this.payButton = page.locator('[data-qa="pay-button"]')


    }
        activateDiscount = async() => {
             const code = await this.discountCode.innerText()
             this.discountCodeInput.fill(code)
             await expect(this.discountCodeInput).toHaveValue(code)

             expect(await this.discountActivateMessage.isVisible()).toBe(false)
             this.submitDiscount.click()
             await expect(this.discountActivateMessage).toHaveText("Discount activated!")
             const discountValueText = await this.totalIncludinDiscount.innerText()
             const discountValueTOnlyStringNumber = discountValueText.replace('$','')
             const discountValueNumber = parseInt(discountValueTOnlyStringNumber)
             const discountTotalPriceText = await this.totalPrice.innerText()
             const discountTotalPriceOnlyStringNumber = discountTotalPriceText.replace('$','')
             const discountTotalPriceNumber= parseInt(discountTotalPriceOnlyStringNumber)
            
             expect(discountValueNumber).toBeLessThan(discountTotalPriceNumber)
        }

        fillPaymentDetails = async(creditCardDetails) => {
            await this.cardOwner.fill(creditCardDetails.owner)
            await this.cardNumber.fill(creditCardDetails.cardNumber)
            await this.validUntil.fill(creditCardDetails.validUntil)
            await this.cvc.fill(creditCardDetails.cvc)
         
        }

        completePayment = async() =>{
            await this.payButton.click()
            await this.page.waitForURL(/\/thank-you/, {timeout: 3000})
        }

    
}

  
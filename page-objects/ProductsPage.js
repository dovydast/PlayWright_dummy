import { expect } from "@playwright/test"
import { Navigation } from "./Navigation"
import { isDesktopViewport } from "./utils/isDesktopViewport"

export class ProductsPage {

    constructor(page) {
        this.page = page
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.dropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')

       
    }

    visit = async () => {
        await this.page.goto("/")
    }
 
    addProductToBasket = async (index) => {
      const specificButton = this.addButtons.nth(index)
      const navigation = new Navigation(this.page)

       await expect(specificButton).toHaveText("Add to Basket")
       // only desktop viewport
       let basketCountBeforeAdding = 0
       if(isDesktopViewport(this.page)){
            basketCountBeforeAdding = await navigation.getBasketCount()
       }
       await specificButton.click()
       await expect(specificButton).toHaveText("Remove from Basket")
        // only desktop viewport
        if(isDesktopViewport(this.page)){
            const basketCountAfterAdding = await navigation.getBasketCount()
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
        }
    }

    sortByCheapest = async () => {
        const productTitlesBeforeSorting = await this.productTitle.allInnerTexts()
        await this.dropdown.selectOption("price-asc")
        const productTitlesAfterSorting = await this.productTitle.allInnerTexts()
        expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting)
    }
}
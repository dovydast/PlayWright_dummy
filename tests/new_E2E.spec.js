import { test } from "@playwright/test"
import { ProductPage } from "../page-objects/ProductPage"
test.only("New user full end-to-end test journery", async ({ page }) =>{
    const productsPage = new ProductPage(page)
    await productsPage.visit()
    await page.pause()
})
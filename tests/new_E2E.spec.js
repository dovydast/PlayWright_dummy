import { test } from "@playwright/test"
import { v4 as uuidv4 } from "uuid";
import { ProductsPage } from "../page-objects/ProductsPage"
import { Navigation } from "../page-objects/Navigation"
import { CheckoutPage } from "../page-objects/CheckoutPage"
import { LoginPage } from "../page-objects/LoginPage"
import { RegisterPage } from "../page-objects/RegisterPage"


test.only("New user full end-to-end test journery", async ({ page }) =>{
    const productsPage = new ProductsPage(page)
    const navigation = new Navigation(page)
    const checkoutPage = new CheckoutPage(page)
    const loginPage = new LoginPage(page)
    const registerPage = new RegisterPage(page)

    await productsPage.visit()
    await productsPage.sortByCheapest()
    await productsPage.addProductToBasket(0)
    await productsPage.addProductToBasket(1)
    await productsPage.addProductToBasket(2)

    await navigation.goToCheckout()
    await checkoutPage.removeCheapestProduct()
    await checkoutPage.continueToCheckout()

    await loginPage.goToRegisterPage()
   
    const email = uuidv4() + "@gmail.com"
    const password = uuidv4()
    await registerPage.signUpAsNewUser(email, password)
})
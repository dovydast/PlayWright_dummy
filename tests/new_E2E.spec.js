import { test } from "@playwright/test"
import { v4 as uuidv4 } from "uuid";
import { ProductsPage } from "../page-objects/ProductsPage"
import { Navigation } from "../page-objects/Navigation"
import { CheckoutPage } from "../page-objects/CheckoutPage"
import { LoginPage } from "../page-objects/LoginPage"
import { RegisterPage } from "../page-objects/RegisterPage"
import { DeliveryDetailsPage } from "../page-objects/DeliveryDetailsPage";
import { deliveryDetails as userAddress } from "./../data/deliveryDetails"
import { paymentDetails as creditCardDetails } from "../data/paymentDetails";
import { PaymentPage } from "../page-objects/PaymentPage";


test("New user full end-to-end test journery", async ({ page }) =>{
    const productsPage = new ProductsPage(page)
    const navigation = new Navigation(page)
    const checkoutPage = new CheckoutPage(page)
    const loginPage = new LoginPage(page)
    const registerPage = new RegisterPage(page)
    const deliveryDetails = new DeliveryDetailsPage(page)
    const paymentPage = new PaymentPage(page)

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
    await deliveryDetails.fillDeliveryDetails(userAddress)
    await deliveryDetails.saveDetails()
    await deliveryDetails.continueToPayment()
    await paymentPage.activateDiscount()
    await paymentPage.fillPaymentDetails(creditCardDetails)
    await paymentPage.completePayment()
})
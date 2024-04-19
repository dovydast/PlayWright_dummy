export class LoginPage{
    constructor(page){
        this.page = page
        this.registerButton = page.locator('[data-qa="go-to-signup-button"]')
    }

    goToRegisterPage = async () => {
        await this.registerButton.click()
        this.page.waitForURL(/\/signup/, {timeout:2000})
    }
}
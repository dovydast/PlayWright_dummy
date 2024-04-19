export class RegisterPage{
    constructor(page){
        this.page = page
        this.emailInput = page.getByPlaceholder('E-Mail')
        this.passwordInput = page.getByPlaceholder('Password')
        this.submitButton = page.getByRole('button', {name: "register"})
    }

    signUpAsNewUser = async (email, password) => {
        await this.emailInput.waitFor()
        this.emailInput.fill(email)
        await this.passwordInput.waitFor()
        this.passwordInput.fill(password)
        await this.page.pause()
        await this.submitButton.click()
    }
}
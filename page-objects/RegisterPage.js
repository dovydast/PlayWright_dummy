export class RegisterPage{
    constructor(page){
        this.page = page
        this.emailInput = page.getByPlaceholder('E-Mail')
        this.passwordInput = page.getByPlaceholder('Password')
        this.submitButton = page.getByRole('button', {name: "register"})
    }

    signUpAsNewUser = async (email, password) => {
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.submitButton.click()
    }
}
import { Page } from "@playwright/test";

export class UserLogin {
  constructor(private page: Page) {}
  async doLogin(email: string, password: string) {
    await this.page.getByRole("textbox", { name: "Email" }).fill(email);
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
    await this.page
      .getByRole("button", { name: "Sign in", exact: true })
      .click();
  }
}

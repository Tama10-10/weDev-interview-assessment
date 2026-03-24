import { Page } from "@playwright/test";
import { UserModel } from "../Models/user.model";
export class UserRegistration {
  constructor(private page: Page) {}
  async register(User: UserModel) {
    await this.page
      .getByRole("textbox", { name: "First Name" })
      .fill(User.firstName);
    await this.page
      .getByRole("textbox", { name: "Last Name" })
      .fill(User.lastName);
    await this.page.getByRole("textbox", { name: "Email" }).fill(User.email);
    await this.page
      .getByRole("textbox", { name: "Password", exact: true })
      .fill(User.password);
    await this.page
      .getByRole("textbox", { name: "Confirm Password" })
      .fill(User.password);
    await this.page.getByRole("button", { name: "Create Account" }).click();
  }
}

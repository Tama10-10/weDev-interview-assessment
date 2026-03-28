import { Page } from "@playwright/test";

export class UserUpdate {
  constructor(private page: Page) {}
  async doUpdate(
    firstName: string,
    lastName: string,
    email: string,
    mobile: string,
  ) {
    await this.page
      .getByRole("textbox", { name: "First Name *" })
      .fill(firstName);
    await this.page
      .getByRole("textbox", { name: "Last Name *" })
      .fill(lastName);
    await this.page.getByRole("textbox", { name: "Email *" }).fill(email);
    await this.page.getByRole("textbox", { name: "Mobile" }).fill(mobile);
    await this.page.getByRole("button", { name: "Female" }).click();
    await this.page.getByRole("button", { name: "Save Changes" }).click();
  }
}

import { faker } from "@faker-js/faker";
import { expect, Page, test } from "@playwright/test";
import { UserModel } from "../Models/user.model";
import { UserLogin } from "../pages/login";
import { UserUpdate } from "../pages/updateProfile";
import { UserRegistration } from "../pages/UserRegistration";
import { generateRandomNumber, getLastUser, saveData } from "../utils/util";
let page: Page;
test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});
// test.afterAll(async () => {
//   await page.pause();
// });

test("Successful User Registration", async () => {
  await page.goto("https://ratul.staging.dokandev.com/");
  await page.getByRole("link", { name: "Signup" }).click();
  const user: UserModel = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: `tamadebnath2001${generateRandomNumber(1000, 9999)}@gmail.com`,
    password: "123456",
  };
  const userRegister = new UserRegistration(page);
  await userRegister.register(user);
  saveData("resources/userData.json", user);
  await expect(page.getByText("Registration Successful")).toBeVisible();
});

test("valid login", async () => {
  await page.goto("https://ratul.staging.dokandev.com/login");
  const user = getLastUser("resources/userData.json");
  const login = new UserLogin(page);
  await login.doLogin(user.email, user.password);
  await expect(page.getByText("Login Successful")).toBeVisible();
});
test("Update profile", async () => {
  await page.goto("https://ratul.staging.dokandev.com/customers/account");
  await page.getByRole("link", { name: "Account Details" }).click();
  const update = new UserUpdate(page);
  await update.doUpdate(
    "tama12",
    "debnath",
    "tdnath2001@gmail.com",
    "01303670001",
  );
  await expect(page.getByRole("main")).toContainText("Save Changes");
});

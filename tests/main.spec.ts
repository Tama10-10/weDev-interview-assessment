import { faker } from "@faker-js/faker";
import { expect, Page, test } from "@playwright/test";
import { UserModel } from "../Models/user.model";
import { UserLogin } from "../pages/login";
import { UserRegistration } from "../pages/UserRegistration";
import { generateRandomNumber, getLastUser, saveData } from "../utils/util";
let page: Page;
test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});
// test.afterAll(async () => {
//   await page.pause();
// });
test("Empty form validation", async () => {
  await page.goto("https://ratul.staging.dokandev.com/");
  await page.getByRole("link", { name: "Signup" }).click();
  await page.getByRole("button", { name: "Create Account" }).click();
  await expect(
    page.getByText("The First Name field is required"),
  ).toBeVisible();
});
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
test("invalid login", async () => {
  const login = new UserLogin(page);
  await login.doLogin("tamadebnath20011@gmail.com", "1234567");
  await expect(page.getByText("The credentials do not match")).toBeVisible();
});
test("valid login", async () => {
  await page.goto("https://ratul.staging.dokandev.com/login");
  const user = getLastUser("resources/userData.json");
  const login = new UserLogin(page);
  await login.doLogin(user.email, user.password);
  await expect(page.getByText("Login Successful")).toBeVisible();
});

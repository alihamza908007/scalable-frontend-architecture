import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("should log in successfully with valid credentials", async ({
    page,
  }) => {
    await page.goto("/login");

    await page.fill('input[name="email"]', "admin@example.com");
    await page.fill('input[name="password"]', "password");

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL("/dashboard");
    await expect(page.locator("h1")).toContainText("Dashboard");
  });

  test("should show validation error for empty fields", async ({ page }) => {
    await page.goto("/login");

    await page.click('button[type="submit"]');

    await expect(page.locator("p.text-destructive")).toHaveCount(2);
  });
});

test.describe("Teams Management", () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@example.com");
    await page.fill('input[name="password"]', "password");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL("/dashboard");
  });

  test("should navigate to teams page", async ({ page }) => {
    await page.click("text=Teams");
    await expect(page).toHaveURL("/teams");
    await expect(page.locator("h1")).toContainText("Teams");
  });

  test("should create a new team", async ({ page }) => {
    await page.click("text=Teams");
    await page.click("text=Create Team");

    await page.fill('input[name="name"]', "Test Team");
    await page.fill('textarea[name="description"]', "A test team description");

    await page.click('button[type="submit"]');

    // Should close dialog and show team
    await expect(page.locator("text=Test Team")).toBeVisible();
  });
});

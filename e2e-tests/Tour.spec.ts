import { test, expect } from "@playwright/test";

test("Has tour title", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.getByRole("link", { name: "Tour" }).click();

  await expect(page.getByRole("heading", { name: "Tours" })).toContainText(
    "Tour"
  );
  await expect(page.getByText("No result...")).toBeVisible();
});

test("Create/update and remove a tour", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Create a driver and navigate to tour
  await page.getByPlaceholder("Driver name").fill("Driver 1");
  await page.getByPlaceholder("Driver location").fill("Location");
  await page.getByRole("button", { name: "Create a Driver" }).click();
  await page.getByRole("link", { name: "Tour" }).click();

  // Create a tour using the created driver
  await page.getByPlaceholder("From location").fill("Location");
  await page.getByPlaceholder("To location").fill("distination");
  await page.getByPlaceholder("Customer name").fill("Customer");
  await page.locator("[name='shipmentDate']").fill("2024-02-20");
  await page.locator("[name='assignedDriver']").selectOption("Driver 1");
  await page.getByRole("button", { name: "Create a Tour" }).click();

  await expect(page.getByText("No result...")).toBeHidden();
  await expect(page.getByText("Customer")).toBeVisible();
  await expect(page.getByText("20.02.2024")).toBeVisible();
  await expect(page.getByText("Location >>>> distination")).toBeVisible();
  await expect(page.getByText("Driver 1")).toBeVisible();

  // Update the tour
  await page.getByRole("button", { name: "Update" }).click();
  await expect(page.getByPlaceholder("From location")).toHaveValue("Location");

  await page.getByPlaceholder("To location").fill("to");
  await page.getByRole("button", { name: "Update a Tour" }).click();

  await expect(page.getByText("Location >>>> to")).toBeVisible();

  // Remove the tour
  await page.getByRole("button", { name: "Remove" }).click();

  await expect(page.getByText("Customer")).toBeHidden();
  await expect(page.getByText("No result...")).toBeVisible();
});

test("Filter tours", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Create a driver and navigate to tour
  await page.getByPlaceholder("Driver name").fill("Driver 1");
  await page.getByPlaceholder("Driver location").fill("Location");
  await page.getByRole("button", { name: "Create a Driver" }).click();
  await page.getByRole("link", { name: "Tour" }).click();

  // Create the first tour
  await page.getByPlaceholder("From location").fill("Location");
  await page.getByPlaceholder("To location").fill("distination");
  await page.getByPlaceholder("Customer name").fill("Customer");
  await page.locator("[name='shipmentDate']").fill("2024-02-20");
  await page.locator("[name='assignedDriver']").selectOption("Driver 1");
  await page.getByRole("button", { name: "Create a Tour" }).click();

  // Create second tour
  await page.getByPlaceholder("From location").fill("Location");
  await page.getByPlaceholder("To location").fill("to");
  await page.getByPlaceholder("Customer name").fill("Customer 2");
  await page.locator("[name='shipmentDate']").fill("2024-02-25");
  await page.locator("[name='assignedDriver']").selectOption("Driver 1");
  await page.getByRole("button", { name: "Create a Tour" }).click();

  await page.getByPlaceholder("Search for a tour...").fill("Customer 2");

  await expect(page.getByText("Location >>>> distination")).toBeHidden();
  await expect(page.getByText("Location >>>> to")).toBeVisible();
});

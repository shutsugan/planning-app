import { test, expect } from "@playwright/test";

test("Has drivers title", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await expect(page.getByRole("heading", { name: "Drivers" })).toContainText(
    "Drivers"
  );
  await expect(page.getByText("No result...")).toBeVisible();
});

test("Create a driver", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.getByPlaceholder("Driver name").fill("Driver 1");
  await page.getByPlaceholder("Driver location").fill("Location");
  await page.getByRole("button", { name: "Create a Driver" }).click();

  await expect(page.getByText("Driver 1")).toBeVisible();
});

test("Can't create a driver with number in location", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.getByPlaceholder("Driver name").fill("Driver 2");
  await page.getByPlaceholder("Driver location").fill("Location 2");
  await page.getByRole("button", { name: "Create a Driver" }).click();

  await expect(page.getByText("Driver 2")).toBeHidden();
});

test("Update a driver", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.getByPlaceholder("Driver name").fill("Driver 1");
  await page.getByPlaceholder("Driver location").fill("Location");
  await page.getByRole("button", { name: "Create a Driver" }).click();

  await page.getByRole("button", { name: "Update" }).click();

  await expect(page.getByPlaceholder("Driver name")).toHaveValue("Driver 1");
  await expect(page.getByPlaceholder("Driver location")).toHaveValue(
    "Location"
  );

  await page.getByPlaceholder("Driver location").fill("updated");
  await page.getByRole("button", { name: "Update a Driver" }).click();

  await expect(page.getByText("updated")).toBeVisible();
});

test("Remove a driver", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.getByPlaceholder("Driver name").fill("Driver 1");
  await page.getByPlaceholder("Driver location").fill("Location");
  await page.getByRole("button", { name: "Create a Driver" }).click();

  await expect(page.getByText("Driver 1")).toBeVisible();

  await page.getByRole("button", { name: "Remove" }).click();

  await expect(page.getByText("Driver 1")).toBeHidden();
  await expect(page.getByText("No result...")).toBeVisible();
});

test("Filter drivers", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.getByPlaceholder("Driver name").fill("Driver 1");
  await page.getByPlaceholder("Driver location").fill("Location");
  await page.getByRole("button", { name: "Create a Driver" }).click();

  await page.getByPlaceholder("Driver name").fill("Driver 2");
  await page.getByPlaceholder("Driver location").fill("Location");
  await page.getByRole("button", { name: "Create a Driver" }).click();

  await page.getByPlaceholder("Search for a driver...").fill("Driver 2");

  await expect(page.getByText("Driver 1")).toBeHidden();
  await expect(page.getByText("Driver 2")).toBeVisible();
});

import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('load');
  await page.waitForTimeout(1000);
});

test.describe('Zesty UI', () => {
  test('Init: Load All First Results', async ({ page }) => {
    await expect(page.getByText('results')).toHaveText('5 results', { timeout: 30000 })
  })

  test('Three results: Florida 80k Radius', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Long' }).fill('-80.08234569999999');
    await page.getByRole('textbox', { name: 'Lat' }).fill('26.3248412');
    await page.getByRole('textbox', { name: 'Distance' }).fill('80000');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText('results')).toHaveText('3 results', { timeout: 30000 })
  });

  test('Two results: Florida 60k Radius', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Long' }).fill('-80.08234569999999');
    await page.getByRole('textbox', { name: 'Lat' }).fill('26.3248412');
    await page.getByRole('textbox', { name: 'Distance' }).fill('60000');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText('results')).toHaveText('2 results', { timeout: 30000 })
  });

  test('One Result: Open Modal', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Long' }).fill('-73.748751');
    await page.getByRole('textbox', { name: 'Lat' }).fill('40.9185483');
    await expect(page.getByRole('textbox', { name: 'Distance (radius meters)' })).toHaveValue('10000');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText('results')).toHaveText('1 results', { timeout: 30000 })
    await expect(page.getByRole('heading')).toContainText('id: f1650f2a99824f349643ad234abff6a2');
    await expect(page.getByRole('paragraph')).toContainText('lat: 40.9185483 • long: -73.748751');

    // Open Modal
    await page.getByTestId('card-undefined').locator('div').nth(1).click();
    await expect(page.locator('#root')).toContainText('id: f1650f2a99824f349643ad234abff6a2');
    await expect(page.locator('#root')).toContainText('lat: 40.9185483 • long: -73.748751');
    await expect(page.locator('.bg-cover').first()).toBeVisible();
  });

  // Flaky test, probably want screenshot tests not to run in parallel. Probably too flaky regardless based on map loading.
  // test('Blue circle test', async ({ page }) => {
  //   await page.goto('http://localhost:5173/demo-realestate');
  //   await page.getByRole('textbox', { name: 'Long' }).click();
  //   await page.getByRole('textbox', { name: 'Long' }).fill('-79.08234569999999');
  //   await page.getByRole('textbox', { name: 'Lat' }).fill('26.3248412');
  //   await page.getByRole('button', { name: 'Search' }).click();
  //   await page.waitForTimeout(10000);
  //
  //   expect(await page.screenshot()).toMatchSnapshot('landing-page.png');
  // });
});

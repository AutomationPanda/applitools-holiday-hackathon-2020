import { test } from '@playwright/test';
import { Eyes, Target } from '@applitools/eyes-playwright';
import { buildEyes } from './hooks';

test.describe('AppliFashion', () => {
  const URL_MAIN = 'https://demo.applitools.com/tlcHackathonMasterV1.html';
  const URL_DEV = 'https://demo.applitools.com/tlchackathondev';
  const URL_PROD = 'https://demo.applitools.com/tlcHackathonMasterV2.html';

  let eyes: Eyes;
  
  test.beforeEach(async ({ page }) => {
    eyes = buildEyes();

    await page.setViewportSize({width: 1600, height: 1200});
    // await page.goto(URL_MAIN);
    // await page.goto(URL_DEV);
    await page.goto(URL_PROD);
  });
  
  test('should load the main page', async ({ page }) => {
    await eyes.open(page, 'AppliFashion', '1. Main Page');
    await eyes.check('Main page', Target.window().fully());
    await eyes.close(false);
  });
  
  test('should filter by color', async ({ page }) => {
    await eyes.open(page, 'AppliFashion', '2. Filtering');
    await page.locator('id=SPAN__checkmark__107').click();
    await page.locator('id=filterBtn').click();
    await eyes.checkRegionBy('#product_grid', 'Filter by color')
    await eyes.close(false);
  });
  
  test('should show product details', async ({ page }) => {
    await eyes.open(page, 'AppliFashion', '3. Product Page');
    await page.locator('text="Appli Air x Night"').click();
    await page.locator('id=shoe_img').waitFor();
    await eyes.check('Product details', Target.window().fully());
    await eyes.close(false);
  });

  test.afterEach(async () => {
    await eyes.abort();
  });
});

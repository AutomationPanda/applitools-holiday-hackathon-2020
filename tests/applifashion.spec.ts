import { test } from '@playwright/test';
import { VisualGridRunner, Eyes, Configuration, BatchInfo, BrowserType, DeviceName, Target } from '@applitools/eyes-playwright';

test.describe.configure({ mode: 'parallel' })

test.describe('AppliFashion', () => {
  const URL_MAIN = 'https://demo.applitools.com/tlcHackathonMasterV1.html';
  const URL_DEV = 'https://demo.applitools.com/tlchackathondev';
  const URL_PROD = 'https://demo.applitools.com/tlcHackathonMasterV2.html';

  let runner: VisualGridRunner;
  let batch: BatchInfo;
  let configuration: Configuration;
  let eyes: Eyes;
  
  test.beforeAll(async () => {
    runner = new VisualGridRunner({ testConcurrency: 5 });
    batch = new BatchInfo({name: 'AppliFashion Tests', id: 'applifashion'});

    configuration = new Configuration();
    configuration.setBatch(batch);
    configuration.addBrowser(1200, 800, BrowserType.CHROME);
    configuration.addBrowser(1200, 800, BrowserType.FIREFOX);
    configuration.addBrowser(1200, 800, BrowserType.EDGE_CHROMIUM);
    configuration.addBrowser(1200, 800, BrowserType.SAFARI);
    configuration.addDeviceEmulation(DeviceName.iPhone_X);
  });

  test.beforeEach(async ({ page }) => {
    eyes = new Eyes(runner, configuration);

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
  
  test('should ?', async ({ page }) => {
    await eyes.open(page, 'AppliFashion', '3. Product Page');
    await page.locator('text="Appli Air x Night"').click();
    await page.locator('id=shoe_img').waitFor();
    await eyes.check('Product details', Target.window().fully());
    await eyes.close(false);
  });

  test.afterEach(async () => {
    await eyes.abort();
  });

  test.afterAll(async() => {
    const results = await runner.getAllTestResults(false);
    console.log('Visual test results', results);
  })
});

import { test } from '@playwright/test';
import { Eyes, VisualGridRunner, Configuration, BatchInfo, BrowserType, DeviceName } from '@applitools/eyes-playwright';

export let Runner: VisualGridRunner;
export let Batch: BatchInfo;
export let Config: Configuration;

export function buildEyes() {
    return new Eyes(Runner, Config);
}

test.beforeAll(async () => {
  Runner = new VisualGridRunner({ testConcurrency: 5 });
  Batch = new BatchInfo({name: 'AppliFashion Tests', id: 'applifashion'});

  Config = new Configuration();
  Config.setBatch(Batch);
  Config.addBrowser(1200, 800, BrowserType.CHROME);
  Config.addBrowser(1200, 800, BrowserType.FIREFOX);
  Config.addBrowser(1200, 800, BrowserType.EDGE_CHROMIUM);
  Config.addBrowser(1200, 800, BrowserType.SAFARI);
  Config.addDeviceEmulation(DeviceName.iPhone_X);
});

test.afterAll(async() => {
  const results = await Runner.getAllTestResults(false);
  console.log('Visual test results', results);
});

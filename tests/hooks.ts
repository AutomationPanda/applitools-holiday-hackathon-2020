import { test } from '@playwright/test';
import { Eyes, VisualGridRunner, Configuration, BatchInfo, BrowserType, DeviceName } from '@applitools/eyes-playwright';

export let Runner: VisualGridRunner;
export let Batch: BatchInfo;
export let Config: Configuration;

export function buildEyes() {
  return new Eyes(Runner, Config);
}

export function getAppliFashionUrl() {
  if (!process.env.APPLIFASHION_VERSION) {
    throw new ReferenceError("Environment variable `APPLIFASHION_VERSION` is not defined.")
  }

  let url: string;
  const version = process.env.APPLIFASHION_VERSION.toLowerCase();

  if (version === "main") {
    url = 'https://demo.applitools.com/tlcHackathonMasterV1.html';
  }
  else if (version === "dev") {
    url = 'https://demo.applitools.com/tlchackathondev';
  }
  else if (version === "prod") {
    url = 'https://demo.applitools.com/tlcHackathonMasterV2.html';
  }
  else {
    throw new Error("Environment variable `APPLIFASHION_VERSION` must be 'main', 'dev', or 'prod'");
  }

  return url;
}

test.beforeAll(async () => {
  Runner = new VisualGridRunner({ testConcurrency: 5 });
  Batch = new BatchInfo({name: 'AppliFashion Tests'});

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

# Applitools Holiday Hackathon 2020

This repository contains a solution for the Applitools Holiday Hackathon 2020.
It is a TypeScript project that uses Playwright for testing.


## Project Setup

Install the dependencies:

```
npm install
npx playwright install
```


## Running Tests

You'll need an Applitools account, which you can [register for free](https://auth.applitools.com/users/register).
Set your secret Applitools API key:

```
export APPLITOOLS_API_KEY=<your-key>
```

Then, you'll need to set an Applitools batch ID.
Since these Playwright tests will run in parallel,
they need to have a common batch ID injected into them:

```
export APPLITOOLS_BATCH_ID=`uuidgen` 
```

You can use any type of string-based ID.
It is recommended to generate a fresh ID for every batch.
(Commands will be different for Windows.)

Then, run the tests:

```
npm test
```

This command runs tests against Chromium.
You can explicitly run tests against other browsers like this:

```
npx playwright test --project chromium
npx playwright test --project firefox
npx playwright test --project webkit
```

If you run `npx playwright test` without specifying a project,
then Playwright will run tests against all three browsers.
**However**, you only need to run tests against *one* local browser.
Applitools Eyes will capture visual snapshots to render on multiple different browser configurations in the Ultrafast Grid.

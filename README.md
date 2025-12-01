MultiBank UI Automation Suite

Automated end-to-end UI tests for the MultiBank trading platform and related marketing pages, built with Playwright + TypeScript.

The suite focuses on:

Core trading flows in https://trade.multibank.io/

Navigation & layout of the main menu

Content validation for:

Marketing banners at the bottom of the trading page

Download section (App Store & Google Play)

“About / Why MultiBank?” marketing page (if present in the repo)

This project is designed to look and feel like a real-world automation framework that you can run and extend.

Tech Stack

Language: TypeScript

Test runner: Playwright Test

Pattern: Page Object Model (POM)

Data: External test-data modules (imported as data from ../test-data)

Reporting: Playwright HTML report

Browsers: Chromium, Firefox, WebKit (multi-project config)

Setup
Prerequisites

Node.js 18+

npm 8+

Install dependencies
npm install

Install Playwright browsers (first run only)
npx playwright install

Running the tests
1. Run the main UI suite (easy mode)

In package.json, there is a script:

"scripts": {
"uiTests": "npx playwright test regression.spec.ts"
}


Run it with:

npm run uiTests


This will execute the main regression / UI tests (e.g. navigation, trading flows, content validation).

If this script is not in your package.json yet, you can add it under "scripts".

2. Run the full Playwright suite

To run all tests (all spec files, all browsers):

npx playwright test


By default, the Playwright config is set up with multiple projects:

chromium (Desktop Chrome)

firefox (Desktop Firefox)

webkit (Desktop Safari)

That means each test runs once per browser unless you filter it.

3. Run a specific test file
   npx playwright test tests/regression.spec.ts

4. Run by test name / describe
# Example: only "Content Validation" tests
npx playwright test -g "Content Validation"

5. Limit to a single browser (optional)

If you only want Chromium:

npx playwright test --project=chromium


Other options:

npx playwright test --project=firefox
npx playwright test --project=webkit


You can combine this with the script if you like, for example:

npx playwright test regression.spec.ts --project=chromium

Reports

The project uses Playwright’s built-in HTML report.

Generate and open it with:

npx playwright test
npx playwright show-report


The report includes:

Overall summary

Per-test status (pass/fail)

Failure diagnostics (screenshots, traces if enabled)

This report is great to attach as evidence when you present this project.

What the tests cover
1. Navigation & Layout

Validates the main navigation bar and dropdowns on https://trade.multibank.io/.

Uses centralised test data (e.g. mainMenuData, navigationData) to:

Check visibility and labels of navigation items

Click through to destinations

Assert URLs contain expected fragments (e.g. /markets, /about/why-multibank).

All expected menu items and URLs live in test-data files, not hard-coded in the tests.

2. Trading Functionality

Opens the main trading page and interacts with spot pairs (e.g. BTC/USDT).

Uses data like spotPairTradingData to:

Select and search for specific pairs

Switch between categories / tabs

Validate that key trading components (order book, charts, etc.) are present.

The details of locators and workflows are encapsulated in page objects, so test files stay focused on “what” rather than “how”.

3. Content Validation
   3.1. Marketing banners (bottom carousel)

On the trading page, there is a carousel of marketing banners near the bottom.

The suite:

Scrolls to the banner area.

Uses bannerConfigData (e.g. bannerConfigs(homePage)) to drive expectations for:

Banner text (e.g. “Unlock the Power…”, “Deposit using Card or Wire Transfer”)

CTA button text

Expected redirect URL part (e.g. /register)

For each banner:

Rotates the carousel (helper like switchToNextMarketingBanner) until the banner is visible.

Reads and normalizes the banner text (getBannerText).

Asserts the text matches the expected value from the data file.

Clicks the CTA (visitBannerRedirectionUrl) and validates the destination URL.

Because everything is data-driven, adding or changing a banner is just a change in bannerConfigData.ts.

3.2. Download section (App Store & Google Play)

In the same page, the download section links to the mobile apps.

The tests:

Use a dedicated locator for the two download links (App Store + Google Play).

Use outsideConnections.ts to store the expected URLs:

connectionUrl.appStore

connectionUrl.googlePlay

Assert:

The href attributes on the links match these URLs.

Clicking each link opens a popup tab, and the popup’s URL matches the expected store URL (checked via a helper like assertExternalLinkOpensCorrectUrl).

This gives both static (href) and dynamic (actual navigation) validation.

3.3. About / Why MultiBank page (if included)

If the repo also contains a WhyMultiBankPage and whyMultiBankData.ts, the suite can validate:

The hero section (top label, main title, intro text).

The main value cards (regulation, paid-up capital, regulated spot exchange, high leverage).

Stats and benefits (e.g. number of offices, products, turnover, 20,000+ instruments).

Compliance section (ASIC MEX Exchange + “View License”).

Deep liquidity section and its CTA.

Instant Buy section, including Hacken security assurance.

All expected texts are stored in whyMultiBankData, and the page object provides methods like assertHero, assertValueCards, etc., so the test itself stays very short.

Design Choices

Page Object Model

Each major page has its own class with locators and helper methods.

Tests talk to the app via pm.onHomePage(), pm.onXYZPage() rather than touching raw selectors.

Data-driven assertions

All user-facing text and URLs are stored in src/test-data and imported as data.

This makes it easy to adapt the tests to content changes without touching the test logic.

Multi-browser by default

playwright.config.ts defines projects for Chromium, Firefox, and WebKit.

Every test runs on all three browsers unless explicitly filtered with --project.

Failure diagnostics

HTML report plus trace, screenshots, and video on failure (as configured in Playwright use block).

Extending the project

To add more coverage:

Create/extend a page object
Add locators and helper methods for the new UI behavior.

Add test data
Put expected labels, URLs, and texts into a test-data file and export via index.ts.

Write a test
Use the existing style:

Get the page via the page manager fixture

Use test data via import * as data from '../test-data'

Keep the test short and readable, pushing details into helpers.

This makes the project easy to maintain and a good demonstration of your approach to building real-world automation frameworks.
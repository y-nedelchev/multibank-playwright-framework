import { test } from '../fixtures'
import * as data from '../src/test-data/index'
import {expect} from "@playwright/test";
import {aboutUsSubCategoriesList, spotPairTradingData} from "../src/test-data/index";

test.describe.parallel('Navigation & Layout', () => {
  test('TC01 Verify main navigation menu displays all categories', async ({ pm }) => {
    const actualMainMenuCategories: string[] = await pm.onHomePage().getMainMenuCategories()
    expect(actualMainMenuCategories).toEqual(data.mainCategoriesList)
  })

  test('TC02 Verify Trade subcategories and descriptions', async ({ pm }) => {
    // Trade Sub categories
    const actualTradeSubCategories: string[] = await pm.onHomePage().getTradeCategories()
    expect(actualTradeSubCategories).toEqual(data.tradeSubCategoriesList)

    // Trade Sub categories description
    const actualTradeSubCategoriesDescription: string[] = await pm.onHomePage().getTradeCategoriesDescription()
    expect(actualTradeSubCategoriesDescription).toEqual(data.tradeSubCategoriesDescriptionList)
  })

  test('TC03 Verify Features subcategories and descriptions', async ({ pm }) => {
    // Features Sub Categories
    const actualFeaturesSubCategories: string[] = await pm.onHomePage().getFeaturesSubCategories()
    expect(actualFeaturesSubCategories).toEqual(data.featuresSubCategoriesList)

    // Features Sub categories description
    const actualFeaturesSubCategoriesDescription: string[] = await pm.onHomePage().getFeaturesSubCategoriesDescription()
    expect(actualFeaturesSubCategoriesDescription).toEqual(data.featuresSubCategoriesDescriptionList)
  })

  test('TC04 Verify About Us subcategories and descriptions', async ({ pm }) => {
    // About Us Sub Categories
    const actualAboutUsSubCategories: string[] = await pm.onHomePage().getAboutUsSubCategories()
    expect(actualAboutUsSubCategories).toEqual(data.aboutUsSubCategoriesList)

    // About Us Sub categories description
    const actualAboutUsSubCategoriesDescription: string[] = await pm.onHomePage().getAboutUsSubCategoriesDescription()
    expect(actualAboutUsSubCategoriesDescription).toEqual(data.aboutUsSubCategoriesDescriptionList)
  })

  test('TC05 Verify Support subcategories and descriptions', async ({ pm }) => {
    // Support Sub Categories
    const actualSupportSubCategories: string[] = await pm.onHomePage().getSupportSubCategories()
    expect(actualSupportSubCategories).toEqual(data.supportSubCategoriesList)

    // Support Sub categories description
    const actualSupportSubCategoriesDescription: string[] = await pm.onHomePage().getSupportSubCategoriesDescription()
    expect(actualSupportSubCategoriesDescription).toEqual(data.supportSubCategoriesDescriptionList)
  })

  test.describe('TC06 Verify navigation items are functional and link to appropriate destinations', () => {
    for(let dest of data.navDestinations) {
      test(`Verify ${dest.subCategory} of ${dest.topCategory}`, async ({ pm, page }) => {
        if(dest.topCategory === 'Dashboard' || dest.topCategory === 'Markets'){
          await pm.onHomePage().openMainMenuCategories(dest.subCategory)
        } else if(dest.topCategory === 'Trade'){
          await pm.onHomePage().openTradeSubCategories(dest.subCategory)
        } else if(dest.topCategory === 'Features'){
          await pm.onHomePage().openFeaturesSubCategories(dest.subCategory)
        } else if(dest.topCategory === 'About Us'){
          await pm.onHomePage().openAboutUsSubCategories(dest.subCategory)
        } else if(dest.topCategory === 'Support'){
          await pm.onHomePage().openSupportSubCategories(dest.subCategory)
        }
        await expect(page).toHaveURL(new RegExp(dest.expectedUrlPart))
      })
    }
  })
})

test.describe.parallel('Trading Functionality', () => {
  for(const pair of Object.values(data.spotPairTradingData)){
    test(`TC07 Verify Spot Trading section displays trading pairs ${pair.base}/${pair.second}`, async ({ pm, page }) => {
      const pair = data.spotPairTradingData.btcUsdt

      // As we already verified the navigation flow we could just goto /trade/ETH_USDT. Its a matter of approach.
      await pm.onHomePage().openTradeSubCategories(data.tradeSubCategoriesList[0])
      await Promise.all([
        await pm.onSpotPage().findAndSelectCurrencyPair(pair.search),
        await expect(page).toHaveURL(pair.urlSuffix),
        await page.waitForLoadState('load')
      ])

      const expectedHeaders = [
        `Price (${pair.second})`,
        `Size (${pair.base})`,
        `Total (${pair.second})`
      ]
      await expect(pm.onSpotPage().showAsksAndBidsButton).toBeVisible()
      await expect(pm.onSpotPage().showBidsOnlyButton).toBeVisible()
      await expect(pm.onSpotPage().showAsksOnlyButton).toBeVisible()

      const actualHeaders = await pm.onSpotPage().getOrderBookTableHeader()
      expect(actualHeaders).toEqual(expectedHeaders)

      const lastBullish: number | null = await pm.onSpotPage().getLastBullishCandleData()

      const lastBearish: number | null = await pm.onSpotPage().getLastBearishCandleData()
      expect(lastBullish).toBeGreaterThan(1)

      expect(lastBearish).toBeGreaterThan(1)

    })
  }

})

test.describe.parallel('Content Validation', () => {
  test('TC08 Verify marketing banners appear at the page bottom', async ({ pm, page }) => {
    for(const banner of data.bannerConfigs(pm.onHomePage())){
      const bannerText = await pm.onHomePage().getBannerText(banner.locator)
      await pm.onHomePage().switchToNextMarketingBanner(banner.locator)
      expect(bannerText).toEqual(banner.expectedText)
      await pm.onHomePage().visitBannerRedirectionUrl(banner.locator, banner.expectedRedirectionText)
      await expect(page).toHaveURL(new RegExp(banner.expectedUrlPart))
      await page.goto('/')
    }
  })

  test('TC09 Verify download section links correctly to App Store and Google Play', async ({ pm, page }) => {
    const urls = pm.onHomePage().downloadUrl
    await expect(urls).toHaveCount(2)

    const appStoreUrl = urls.nth(0)
    const googlePlayUrl = urls.nth(1)

    await expect(appStoreUrl).toHaveAttribute('href', data.connectionUrl.appStore)
    await expect(googlePlayUrl).toHaveAttribute('href', data.connectionUrl.googlePlay)

    const targets = [
      {urlToClick: appStoreUrl, expectedUrl: data.connectionUrl.appStore},
      {urlToClick: googlePlayUrl, expectedUrl: data.connectionUrl.googlePlay}
    ]
    for (const { urlToClick, expectedUrl } of targets) {
      await pm.onHomePage().assertExternalLinkOpensCorrectUrl(urlToClick, expectedUrl)
    }
  })

  test('TC10 Verify About Us page renders all expected components with correct text', async ({ pm }) => {
    await pm.onHomePage().openAboutUsSubCategories(data.aboutUsSubCategoriesList[0])

    await pm.onWhyMultibankPage().assertHero(data.whyMultiBankHeroConfig)
    await pm.onWhyMultibankPage().assertValueCards(data.whyMultiBankCardsConfig)
    await pm.onWhyMultibankPage().assertStatsAndBenefits(
        data.whyMultiBankStatsHeadings,
        data.whyMultiBankBackgroundSnippets,
        data.whyMultiBankExtraBenefitsSnippets
    )
    await pm.onWhyMultibankPage().assertCompliance(data.whyMultiBankComplianceConfig)
  })

})
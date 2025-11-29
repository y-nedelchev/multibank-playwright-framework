import { test } from '../fixtures'
import * as data from '../src/test-data/index'
import {expect} from "@playwright/test";

test.describe.parallel('Parallel test suite', () => {
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



  test('TC02 Verify navigation menu categories redirect to the relevant page', async ({ pm }) => {
    await pm.onHomePage().verifyNavigationMenuCategoriesRedirectSuccessfully()
  })
})
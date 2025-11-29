import { test } from '../fixtures'
import * as data from '../src/test-data/index'
import {expect} from "@playwright/test";

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
      test(`Verify ${dest.subCategory} of ${dest.topCategory}`, async ({ pm }) => {
        if(dest.topCategory === 'Dashboard' || dest.topCategory === 'Markets'){
          await pm.onHomePage().openMainMenuCategories(dest.topCategory)
        }
      })
    }
  })
})

test.describe.parallel('Trading Functionality', () => {
  test('TC0 ', async ({ pm }) => {

  })
})

test.describe.parallel('Content Validation', () => {
  test('TC0 ', async ({ pm }) => {

  })
})
import {expect, Locator, Page} from "@playwright/test"
import * as data from '../test-data/index'

export class HomePage {
    private readonly page
    readonly mainMenuCategoriesBar: Locator

    readonly tradeCategoryButton: Locator
    readonly tradeCategoriesTitles: Locator
    readonly tradeCategoriesDescription: Locator
    readonly spotMainBarButton: Locator
    readonly derivativesMainBarButton: Locator
    readonly instantBuyMainBarButton: Locator
    readonly panicSellMainBarButton: Locator
    readonly convertMainBarButton: Locator

    readonly featureCategoryButton: Locator
    readonly featuresCategoriesTitles: Locator
    readonly featuresSubCategoriesDescription: Locator

    constructor(page: Page) {
        this.page = page
        this.mainMenuCategoriesBar = page.locator('.style_menu-container__Ha_wV')

        // Trade Categories
        this.tradeCategoryButton = page.locator('#trade-header-option-open-button')
        this.tradeCategoriesTitles = page.locator('.style_text__TYMU_')
        this.tradeCategoriesDescription = page.locator('.style_text__TYMU_ span')
        this.spotMainBarButton = page.locator('.style_popover-panel__IfxFO').getByRole('link', { name: 'Spot' })
        this.derivativesMainBarButton = page.locator('.style_popover-panel__IfxFO').getByRole('link', { name: 'Derivatives' })
        this.instantBuyMainBarButton = page.locator('.style_popover-panel__IfxFO').getByRole('link', { name: 'Instant Buy' })
        this.panicSellMainBarButton = page.locator('.style_popover-panel__IfxFO').getByRole('link', { name: 'Panic Sell' })
        this.convertMainBarButton = page.locator('.style_popover-panel__IfxFO').getByRole('link', { name: 'Convert' })

        //Feature Categories
        this.featureCategoryButton = page.locator('#features-header-option-open-button')
        this.featuresCategoriesTitles = page.locator('.style_text__P_cgP')
        this.featuresSubCategoriesDescription = page.locator('.style_text__P_cgP span')

    }

    async getMainMenuCategories(): Promise<string[]> {
        return (await this.mainMenuCategoriesBar.innerText()).split('\n')
    }

    async getTradeCategories(): Promise<string[]> {
        await this.tradeCategoryButton.hover()
        const tradeRawTexts: string[] = await this.tradeCategoriesTitles.allInnerTexts()
        return tradeRawTexts.map(text =>
            text.split('\n')[0].trim()
        )
    }

    async getTradeCategoriesDescription(): Promise<string[]> {
        return await this.tradeCategoriesDescription.allTextContents()
    }

    async getFeaturesSubCategories(): Promise<string[]> {
        await this.featureCategoryButton.hover()
        const featuresRawTexts: string[] = await this.featuresCategoriesTitles.allInnerTexts()
        return featuresRawTexts.map(text =>
            text.split('\n')[0].trim()
        )
    }

    async getFeaturesSubCategoriesDescription(): Promise<string[]> {
        return await this.featuresSubCategoriesDescription.allTextContents()
    }

    async verifyNavigationMenuCategoriesArePresent() {
        // Main categories
        const actualMainMenuCategories: string[] = await this.getMainMenuCategories()
        expect(actualMainMenuCategories).toEqual(data.mainCategoriesList)

        // Trade Sub categories
        const actualTradeSubCategories: string[] = await this.getTradeCategories()
        expect(actualTradeSubCategories).toEqual(data.tradeSubCategoriesList)

        // Trade Sub categories description
        const actualTradeSubCategoriesDescription: string[] = await this.getTradeCategoriesDescription()
        expect(actualTradeSubCategoriesDescription).toEqual(data.tradeSubCategoriesDescriptionList)

        // Features Sub Categories
        const actualFeaturesSubCategories: string[] = await this.getFeaturesSubCategories()
        expect(actualFeaturesSubCategories).toEqual(data.featuresSubCategoriesList)

        // Features Sub categories description
        const actualFeaturesSubCategoriesDescription: string[] = await this.getFeaturesSubCategoriesDescription()
        expect(actualFeaturesSubCategoriesDescription).toEqual(data.featuresSubCategoriesDescriptionList)
    }

    async verifyNavigationMenuCategoriesRedirectSuccessfully(){
        await this.tradeCategoryButton.hover()
        await this.spotMainBarButton.click()
    }
}
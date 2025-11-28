import {test, expect, Page, Locator} from "@playwright/test"

export class HomePage {
    private readonly page
    readonly mainMenuCategories: Locator
    readonly tradeCategoryButton: Locator
    readonly tradeCategoriesTitles: Locator
    readonly tradeCategoriesDescription: Locator

    readonly featureCategoryButton: Locator
    readonly featuresCategoriesTitles: Locator
    readonly featuresSubCategoriesDescription: Locator

    constructor(page: Page) {
        this.page = page
        this.mainMenuCategories = page.locator('.style_menu-container__Ha_wV')
        this.tradeCategoryButton = page.locator('#trade-header-option-open-button')
        this.tradeCategoriesTitles = page.locator('.style_text__TYMU_')
        this.tradeCategoriesDescription = page.locator('.style_text__TYMU_ span')

        this.featureCategoryButton = page.locator('#features-header-option-open-button')
        this.featuresCategoriesTitles = page.locator('.style_text__P_cgP')
        this.featuresSubCategoriesDescription = page.locator('.style_text__P_cgP span')
    }

    // Trade Sub categories
    readonly mainCategoriesList: string[] = [
        'Dashboard',
        'Markets',
        'Trade',
        'Features',
        'About Us',
        'Support']

    readonly tradeSubCategoriesList: string[] = [
        'Spot',
        'Derivatives',
        'Instant Buy',
        'Panic Sell',
        'Convert']

    readonly tradeSubCategoriesDescriptionList: string[] = [
        'Trade crypto with advanced tools',
        'Trade USDT based derivatives',
        'Buy Crypto Instantly',
        'Sell Assets Quickly',
        'Quickly swap any assets'
    ]

    // Features Sub categories
    readonly featuresSubCategoriesList: string[] = [
        'Spot Exchange',
        'Institutional',
        'Buy & Sell'
    ]

    readonly featuresSubCategoriesDescriptionList: string[] = [
        'Trade digital currencies',
        'Access the full institutional package',
        'The fastest way to buy crypto'
    ]

    async verifyNavigationMenuCategoriesArePresent() {
        // Main categories
        const actualCategories: string[] = (await this.mainMenuCategories.innerText()).split('\n')
        expect(actualCategories).toEqual(this.mainCategoriesList)

        // Trade Sub categories
        await this.tradeCategoryButton.hover()
        const tradeRawTexts: string[] = await this.tradeCategoriesTitles.allInnerTexts()
        const actualTradeSubCategories: string[] = tradeRawTexts.map(text =>
            text.split('\n')[0].trim()
        )
        expect(actualTradeSubCategories).toEqual(this.tradeSubCategoriesList)

        // Trade Sub categories description
        const actualTradeSubCategoriesDescription: string[] = (await this.tradeCategoriesDescription.allTextContents())
        expect(actualTradeSubCategoriesDescription).toEqual(this.tradeSubCategoriesDescriptionList)

        // Features Sub Categories
        await this.featureCategoryButton.hover()
        const featuresRawTexts: string[] = await this.featuresCategoriesTitles.allInnerTexts()
        const actualFeaturesSubCategories: string[] = featuresRawTexts.map(text =>
            text.split('\n')[0].trim()
        )
        expect(actualFeaturesSubCategories).toEqual(this.featuresSubCategoriesList)

        // Features Sub categories description
        const actualFeaturesSubCategoriesDescription: string[] = (await this.featuresSubCategoriesDescription.allTextContents())
        expect(actualFeaturesSubCategoriesDescription).toEqual(this.featuresSubCategoriesDescriptionList)
    }

    verifyNavigationMenuCategoriesRedirectSuccessfully(){

    }
}
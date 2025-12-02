import {expect, Locator, Page} from "@playwright/test"

export class HomePage {
    private readonly page
    readonly mainMenuCategoriesBar: Locator

    // Trade Categories
    readonly tradeCategoryButton: Locator
    readonly tradeCategoriesTitles: Locator
    readonly tradeCategoriesDescription: Locator
    readonly spotMainBarButton: Locator
    readonly derivativesMainBarButton: Locator
    readonly instantBuyMainBarButton: Locator
    readonly panicSellMainBarButton: Locator
    readonly convertMainBarButton: Locator

    // Feature Categories
    readonly featureCategoryButton: Locator
    readonly featuresCategoriesTitles: Locator
    readonly featuresSubCategoriesDescription: Locator

    // About Us
    readonly aboutUsCategoryButton: Locator
    readonly aboutUsSubCategories: Locator
    readonly aboutUsSubCategoriesDescription: Locator

    // Support
    readonly supportCategoriesButton: Locator
    readonly supportSubCategoriesButton: Locator
    readonly supportSubCategoriesDescription: Locator

    // Marketing Banners
    readonly unlockThePowerBanner: Locator
    readonly depositUsingCardBanner: Locator
    readonly contactCustomerSupportBanner: Locator
    readonly heavyRegulatedBanner: Locator
    readonly bannerLeftArrowButton: Locator
    readonly bannerText: Locator

    // Download URLs
    readonly downloadUrl: Locator

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

        // Feature Categories
        this.featureCategoryButton = page.locator('#features-header-option-open-button')
        this.featuresCategoriesTitles = page.locator('.style_text__P_cgP')
        this.featuresSubCategoriesDescription = page.locator('.style_text__P_cgP span')

        // About Us
        this.aboutUsCategoryButton = page.locator('#about-header-option-open-button')
        this.aboutUsSubCategories = page.locator('.style_trade-link__m4JnR')
        this.aboutUsSubCategoriesDescription = page.locator('.style_trade-link__m4JnR span')

        // Support
        this.supportCategoriesButton = page.locator('#support-header-option-open-button')
        this.supportSubCategoriesButton = page.locator('.style_trade-link__jtY3X')
        this.supportSubCategoriesDescription = page.locator('.style_trade-link__jtY3X span')

        // Marketing Banners
        this.unlockThePowerBanner = page.locator('.slick-list [data-index="1"]')
        this.depositUsingCardBanner = page.locator('.slick-list [data-index="2"]')
        this.contactCustomerSupportBanner = page.locator('.slick-list [data-index="3"]')
        this.heavyRegulatedBanner = page.locator('.slick-list [data-index="4"]')
        this.bannerLeftArrowButton = page.locator('.style_wrapper__ag9kn .style_secondary__kmZUZ')
        this.bannerText = page.locator('.style_title__g8VH0')

        // Download URLs
        this.downloadUrl = page.locator('.style_buttons-container__9n_JQ a')
    }

    async getMainMenuCategories(): Promise<string[]> {
        return (await this.mainMenuCategoriesBar.innerText()).split('\n')
    }

    // Trade Categories
    async getTradeCategories(): Promise<string[]> {
        await this.tradeCategoryButton.hover()
        const tradeRawTexts: string[] = await this.tradeCategoriesTitles.allInnerTexts()
        return tradeRawTexts.map(text =>
            text.split('\n')[0].trim()
        )
    }

    async getTradeCategoriesDescription(): Promise<string[]> {
        await this.tradeCategoryButton.hover()
        return this.tradeCategoriesDescription.allTextContents()
    }

    // Feature Categories
    async getFeaturesSubCategories(): Promise<string[]> {
        await this.featureCategoryButton.hover()
        const featuresRawTexts: string[] = await this.featuresCategoriesTitles.allInnerTexts()
        return featuresRawTexts.map(text =>
            text.split('\n')[0].trim()
        )
    }

    async getFeaturesSubCategoriesDescription(): Promise<string[]> {
        await this.featureCategoryButton.hover()
        return this.featuresSubCategoriesDescription.allTextContents()
    }

    // About Us
    async getAboutUsSubCategories(): Promise<string[]> {
        await this.aboutUsCategoryButton.hover()
        const aboutUsRawTexts: string[] = await this.aboutUsSubCategories.allInnerTexts()
        return aboutUsRawTexts.map(text =>
            text.split('\n')[0].trim()
        )
    }

    async getAboutUsSubCategoriesDescription(): Promise<string[]> {
        await this.aboutUsCategoryButton.hover()
        return this.aboutUsSubCategoriesDescription.allTextContents()
    }

    // Support
    async getSupportSubCategories(): Promise<string[]> {
        await this.supportCategoriesButton.hover()
        const supportCategoriesRawTexts: string[] = await this.supportSubCategoriesButton.allInnerTexts()
        return supportCategoriesRawTexts.map(text =>
            text.split('\n')[0].trim()
        )
    }

    async getSupportSubCategoriesDescription(): Promise<string[]> {
        await this.supportCategoriesButton.hover()
        return this.supportSubCategoriesDescription.allTextContents()
    }

    mainMenuBar(name: string): Locator{
        return this.mainMenuCategoriesBar.getByRole('link', { name })
    }

    async openMainMenuCategories(name: string): Promise<void> {
        await this.mainMenuBar(name).click()
    }

    async openTradeSubCategories(name: string): Promise<void> {
        await this.tradeCategoryButton.hover()
        await this.tradeCategoriesTitles.filter({hasText: name}).click()
    }

    async openFeaturesSubCategories(name: string): Promise<void>{
        await this.featureCategoryButton.hover()
        await this.featuresCategoriesTitles.filter({hasText: name}).click()
    }

    async openAboutUsSubCategories(name: string): Promise<void>{
        await this.aboutUsCategoryButton.hover()
        await this.aboutUsSubCategories.filter({hasText: name}).click()
    }

    async openSupportSubCategories(name: string): Promise<void>{
        await this.supportCategoriesButton.hover()
        await this.supportSubCategoriesButton.filter({hasText: name}).click()
    }

    async getBannerText(banner: Locator): Promise<string> {
        const text: string = await banner.locator(this.bannerText).innerText()
        return text.replace(/"/g, '').replace(/\s+/g, ' ').trim()
    }

    async switchToNextMarketingBanner(banner: Locator): Promise<void> {
        for(let i = 0; i < 5; i++){
            if(await banner.isVisible())
                return
            await this.bannerLeftArrowButton.click()
        }
        throw new Error('Banner is not visible after rotating the entire carousel')
    }

    async visitBannerRedirectionUrl(banner: Locator, bannerRedirectionButton: string): Promise<void> {
        await banner.getByText(bannerRedirectionButton).click()
    }

    async assertExternalLinkOpensCorrectUrl(urlToClick: Locator, expectedUrl: string): Promise<void> {
        const [popup] = await Promise.all([
            this.page.waitForEvent('popup'),
            urlToClick.click()
        ])
        await expect(popup).toHaveURL(expectedUrl)
        await popup.close()
    }
}
import {expect, Locator, Page} from "@playwright/test"
import * as data from '../../test-data/index'

export class WhyMultibankPage{
    private readonly page: Page
    readonly whyMultibankSection: Locator
    readonly heroIntro: Locator
    readonly statsCardContainer: Locator
    readonly sinceEstablished : Locator
    readonly advantagesContainer: Locator
    readonly regulationsContainer: Locator
    readonly deepPoolContainer: Locator

    constructor(page: Page) {
        this.page = page
        this.whyMultibankSection = page.locator('.why-multibank_headerSectionContainer__mAPr0')
        this.heroIntro = page.locator('.header-section_header-div__KEPqb .font-size-2')
        this.statsCardContainer = page.locator('.established_col__AIg2X .established_card-container__lzZAa')
        this.sinceEstablished = page.locator('.why-multibank_container__BDnZV .established_established-container__Ay7Z7')
        this.advantagesContainer = page.locator('.advantages_card-container__iF2sO').first()
        this.regulationsContainer = page.locator('.regulations_card-div__yo3qm').first()
        this.deepPoolContainer = page.locator('.card_image-container__N9Nwx').first()
    }

    async assertHero(config: data.WhyMultiBankHeroConfig) {
        const heroLabel = this.whyMultibankSection.getByText(config.label)
        const heroTitle = this.page.getByRole('heading', { level: 1, name: config.title })

        await expect(heroLabel).toBeVisible()
        await expect(heroTitle).toBeVisible()

        for (const snippet of config.introSnippets) {
            await expect(this.heroIntro).toContainText(snippet)
        }
    }

    async assertValueCards(configs: data.WhyMultiBankCardConfig[]) {
        for (const cfg of configs) {
            const heading = this.page.getByRole('heading', { name: cfg.title })
            const card = heading.locator('..')

            await expect(heading).toBeVisible()

            for (const snippet of cfg.descriptionSnippets) {
                await expect(card).toContainText(snippet)
            }

            if (cfg.badgeText) {
                await expect(card.getByText(cfg.badgeText)).toBeVisible()
            }
        }
    }

    async assertStatsAndBenefits(
        statsHeadings: string[],
        backgroundSnippets: string[],
        extraBenefitsSnippets: string[]
    ) {

        for (const heading of statsHeadings) {
            await expect(this.sinceEstablished).toContainText(heading)
        }

        for (const snippet of backgroundSnippets) {
            await expect(this.sinceEstablished).toContainText(snippet)
        }

        for (const snippet of extraBenefitsSnippets) {
            await expect(this.advantagesContainer).toContainText(snippet)
        }
    }

    async assertCompliance(config: data.WhyMultiBankComplianceConfig) {
        const heading = this.page.getByRole('heading', { name: config.title })

        await expect(heading).toBeVisible()

        for (const snippet of config.descriptionSnippets) {
            await expect(this.regulationsContainer).toContainText(snippet)
        }

        await expect(this.page.getByText(config.licenseLinkText)).toBeVisible()
    }
}

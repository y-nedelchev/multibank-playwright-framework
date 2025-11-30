import {Locator, Page} from "@playwright/test"

export class SpotPage {
    private readonly page
    readonly expandSearchFieldButton: Locator
    readonly searchPairsField: Locator
    readonly currencyPairSearchResult: Locator
    readonly tradePairSearchTable: Locator
    readonly tradePairTableHeader: Locator
    readonly pairTableFirstRowCells: Locator
    readonly pairTableNameCell: Locator
    readonly orderBookTable: Locator
    readonly orderBookTableHeader: Locator
    readonly chartCanvas: Locator
    readonly showAsksAndBidsButton: Locator
    readonly showBidsOnlyButton: Locator
    readonly showAsksOnlyButton: Locator
    readonly lastBearishData: Locator
    readonly lastBullishCandleData: Locator

    constructor(page: Page) {
        this.page = page
        this.expandSearchFieldButton = page.locator('.style_data-container__5XcFr div').first()
        this.searchPairsField = page.locator('#trade-search-pairs-input input')
        this.currencyPairSearchResult = page.locator('#trade-pairs-td')
        this.tradePairSearchTable = page.locator('#trade-pairs')
        this.tradePairTableHeader = this.tradePairSearchTable.locator('thead th')
        this.pairTableFirstRowCells = this.tradePairSearchTable.getByRole('row').first()
        this.pairTableNameCell = this.pairTableFirstRowCells.getByRole('cell').first()
        this.orderBookTable = this.page.locator('.h-100-md')
        this.orderBookTableHeader = this.page.locator('.style_header__MuBJl').first()
        this.chartCanvas = this.page.frameLocator('iframe[title="Financial Chart"]').locator('canvas[data-name="pane-top-canvas"]')
        this.showAsksAndBidsButton = this.page.getByRole('button', {name: 'Show asks and bids'}).first()
        this.showBidsOnlyButton = this.page.getByRole('button', {name: 'Show bids only'}).first()
        this.showAsksOnlyButton = this.page.getByRole('button', {name: 'Show asks only'}).first()
        this.lastBearishData = this.page.locator('.style_asks__UrOr_ [data-index="0"] div').first()
        this.lastBullishCandleData = this.page.locator('.style_bids__mZ0a3 [data-index="0"] div').first()

    }
    /**
     * Opens the trading pair search, filters by the given query
     * and selects the first matching currency pair from the results.
     *
     * @param pair Trading pair identifier (for example: "BTC-USDT").
     */
    async findAndSelectCurrencyPair(pair: string): Promise<void>{
        await this.expandSearchFieldButton.click()
        await this.searchPairsField.fill(pair)
        await this.currencyPairSearchResult.click()
    }



    async getOrderBookTableHeader(): Promise<string[]>{
        await this.chartCanvas.waitFor({state: 'visible'})
        const actualTableHeader:string[] = await this.orderBookTableHeader.allInnerTexts()
        return actualTableHeader[0].split('\n').map(t => t.trim())
    }

    async getLastBearishCandleData(): Promise<number | null>{
        const lastBearishDataContent = await this.lastBearishData.textContent()
        if(!lastBearishDataContent) {
            return null
        }
        const withoutComma = lastBearishDataContent.replace(/,/g, '')
        return Number(withoutComma.trim())
    }

    async getLastBullishCandleData(): Promise<number | null>{
        const lastBullishDataContent = await this.lastBullishCandleData.textContent()
        if(!lastBullishDataContent) {
            return null
        }
        const withoutComma = lastBullishDataContent.replace(/,/g, '')
        return Number(withoutComma?.trim())
    }
}
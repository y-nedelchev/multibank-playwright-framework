import {Page} from '@playwright/test'
import {HomePage} from "./homePage"
import {SpotPage} from "./trade/spotPage";

export class PageManager {

    private readonly page: Page
    private readonly homePage: HomePage
    private readonly spotPage: SpotPage

    constructor(page: Page) {
        this.page = page
        this.homePage = new HomePage(this.page)
        this.spotPage = new SpotPage(this.page)
    }

    onHomePage() {
        return this.homePage
    }

    onSpotPage() {
        return this.spotPage
    }
}
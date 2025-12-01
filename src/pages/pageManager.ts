import {Page} from '@playwright/test'
import {BasePage} from "./basePage"
import {HomePage} from "./homePage"
import {SpotPage} from "./trade/spotPage";
import {WhyMultibankPage} from "./about-us/whyMultibankPage";

export class PageManager {

    private readonly page: Page
    private readonly basePage: BasePage
    private readonly homePage: HomePage
    private readonly spotPage: SpotPage
    private readonly whyMultibank: WhyMultibankPage

    constructor(page: Page) {
        this.page = page
        this.basePage = new BasePage(this.page)
        this.homePage = new HomePage(this.page)
        this.spotPage = new SpotPage(this.page)
        this.whyMultibank = new WhyMultibankPage(this.page)
    }

    onBasePage(){
        return this.basePage
    }

    onHomePage() {
        return this.homePage
    }

    onSpotPage() {
        return this.spotPage
    }

    onWhyMultibankPage() {
        return this.whyMultibank
    }
}
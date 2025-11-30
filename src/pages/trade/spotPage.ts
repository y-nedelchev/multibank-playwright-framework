import {Locator, Page} from "@playwright/test"

export class SpotPage {
    private readonly page

    constructor(page: Page) {
        this.page = page
    }
}
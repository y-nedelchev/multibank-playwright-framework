import {Page} from "@playwright/test";

export class BasePage {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }


    async waitForResponseByPath(path: string): Promise<void>{
        await this.page.waitForResponse(response =>
        {
            const url = response.url()
            return url == path && response.ok()
        })
    }
}
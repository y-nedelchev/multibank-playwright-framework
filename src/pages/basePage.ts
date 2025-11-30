import {Page} from "@playwright/test";

export class BasePage {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    /**
     * Waits for a single successful network response whose URL exactly matches the provided path.
     *
     * The method completes when a response with:
     *  - url() === path
     *  - ok() === true
     * is observed for the current page, or the default timeout is reached.
     *
     * @param path Request path to match against the response URL.
     */
    async waitForResponseByPath(path: string): Promise<void>{
        await this.page.waitForResponse(response =>
        {
            const url = response.url()
            return url == path && response.ok()
        })
    }
}
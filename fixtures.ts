import {test as base} from '@playwright/test'
import {PageManager} from "./src/pages/pageManager";

export type TestOptions = {
    navigateToHomePage: string
    pm: PageManager
}

export const test = base.extend<TestOptions>({

    navigateToHomePage: [async ({page}, use) => {
        await page.goto('/')
        await use('')
    }, {auto: true}],

    pm: async ({page}, use) => {
        const pageManager = new PageManager(page)
        await use(pageManager)
    }
})
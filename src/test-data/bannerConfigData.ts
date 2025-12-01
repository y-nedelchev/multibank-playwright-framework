import {HomePage} from "../pages/homePage";
import {Locator} from "@playwright/test";

type BannerConfig = {
    expectedText: string
    locator: Locator
    expectedRedirectionText: string
    expectedUrlPart: string
}

export const bannerConfigs = (homePage: HomePage): BannerConfig[] => [
    {
        expectedText: 'Unlock the Power of Up to 250x Leverage on Crypto Derivatives!',
        locator: homePage.unlockThePowerBanner,
        expectedRedirectionText: 'Join Now & Start Trading!',
        expectedUrlPart: '/register'
    },
    {
        expectedText: 'Deposit using Card or Wire Transfer',
        locator: homePage.depositUsingCardBanner,
        expectedRedirectionText: 'Sign up',
        expectedUrlPart: '/register'
    },
    {
        expectedText: 'Contact our 24/7 Customer Support for any inquiries',
        locator: homePage.contactCustomerSupportBanner,
        expectedRedirectionText: 'Contact Support',
        expectedUrlPart: '/'
    },
    {
        expectedText: 'Heavily Regulated',
        locator: homePage.heavyRegulatedBanner,
        expectedRedirectionText: 'Sign Up Now!',
        expectedUrlPart: '/register'
    }
]
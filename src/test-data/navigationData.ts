export type NavDestination = {
    topCategory: 'Dashboard' | 'Markets' | 'Trade' | 'Features' | 'About Us' | 'Support'
    subCategory: string
    expectedUrlPart: string
}

export const navDestinations: NavDestination[] = [
    // Direct categories
    {
        topCategory: 'Dashboard',
        subCategory: 'Dashboard',
        expectedUrlPart: '/'
    },
    {
        topCategory: 'Markets',
        subCategory: 'Markets',
        expectedUrlPart: '/markets'
    },

    // Trade sub category
    {
        topCategory: 'Trade',
        subCategory: 'Spot',
        expectedUrlPart: '/trade/BTC_USD'
    },
    {
        topCategory: 'Trade',
        subCategory: 'Derivatives',
        expectedUrlPart: '/derivatives/BTCUST'
    },
    {
        topCategory: 'Trade',
        subCategory: 'Instant Buy',
        expectedUrlPart: ''
    },
    {
        topCategory: 'Trade',
        subCategory: 'Panic Sell',
        expectedUrlPart: ''
    },
    {
        topCategory: 'Trade',
        subCategory: 'Convert',
        expectedUrlPart: '/trade/convert'
    },

    // Features sub category
    {
        topCategory: 'Features',
        subCategory: 'Spot Exchange',
        expectedUrlPart: '/features/spot-exchange'
    },
    {
        topCategory: 'Features',
        subCategory: 'Institutional',
        expectedUrlPart: '/features/institutional'
    },
    {
        topCategory: 'Features',
        subCategory: 'Buy & Sell',
        expectedUrlPart: '/features/instant-buy'
    },

    // About Us sub category
    {
        topCategory: 'About Us',
        subCategory: 'Why Multibank?',
        expectedUrlPart: '/about/why-multibank'
    },
    {
        topCategory: 'About Us',
        subCategory: 'Global Presence',
        expectedUrlPart: '/about/global-presence'
    },
    {
        topCategory: 'About Us',
        subCategory: 'Management',
        expectedUrlPart: '/about/management'
    },
    {
        topCategory: 'About Us',
        subCategory: 'Awards',
        expectedUrlPart: '/about/awards'
    },
    {
        topCategory: 'About Us',
        subCategory: 'Sponsorship',
        expectedUrlPart: '/about/sponsorship'
    },
    {
        topCategory: 'About Us',
        subCategory: 'Blog',
        expectedUrlPart: '/about/blog'
    },
    {
        topCategory: 'About Us',
        subCategory: 'Milestones',
        expectedUrlPart: '/about/milestones'
    },

    // Support sub category
    {
        topCategory: 'Support',
        subCategory: 'Contact Us',
        expectedUrlPart: '/support/contact-us'
    },
    {
        topCategory: 'Support',
        subCategory: 'FAQs',
        expectedUrlPart: '/support/faq'
    }
]

// src/test-data/whyMultiBankData.ts

export type WhyMultiBankHeroConfig = {
    label: string
    title: string
    introSnippets: string[]
}

export type WhyMultiBankCardConfig = {
    title: string
    descriptionSnippets: string[]
    badgeText?: string
}

export type WhyMultiBankComplianceConfig = {
    title: string
    descriptionSnippets: string[]
    licenseLinkText: string
}

export type WhyMultiBankDeepLiquidityConfig = {
    title: string
    subtitle: string
    ctaTitle: string
    ctaSubtitle: string
    ctaLinkText: string
}

export type WhyMultiBankInstantBuyConfig = {
    title: string
    descriptionSnippets: string[]
    assuredByLabel: string
    auditorName: string
}

export const whyMultiBankHeroConfig: WhyMultiBankHeroConfig = {
    label: 'ABOUT US',
    title: 'Why MultiBank?',
    introSnippets: [
        'stamped our authority in the world of trading',
        'pioneered and shaped the foreign exchange industry',
        'exemplary products, services, and trading platforms'
    ]
}

export const whyMultiBankCardsConfig: WhyMultiBankCardConfig[] = [
    {
        title: 'Heavily Regulated across 5 continents',
        descriptionSnippets: [
            'closely supervised by 16 financial regulators',
            'across various jurisdictions',
            'ensuring investor protection'
        ]
    },
    {
        title: 'Paid-up capital of over $322 million',
        descriptionSnippets: [
            'accumulated paid-up capital',
            'globally recognized as one of the largest online financial derivatives providers'
        ]
    },
    {
        title: 'Regulated Spot Exchange',
        descriptionSnippets: [
            'MEX Digital Pty Ltd',
            'regulated by the Australian Securities Investment Commission',
            'registered as a DCE with AUSTRAC'
        ]
    },
    {
        title: 'Leverage up to 250x',
        descriptionSnippets: [
            'one of the highest levels of leverage in the market',
            'helping traders to multiply their profits'
        ],
        badgeText: 'Coming Soon'
    }
]

export const whyMultiBankStatsHeadings: string[] = [
    'Office Worldwide',
    'Countries & Regions',
    'Daily Trading Volume',
    'Trades per day',
    'Clients Worldwide',
    'Products (CFDs, etc..)'
]

export const whyMultiBankBackgroundSnippets: string[] = [
    'established in California, USA, in 2005',
    'paid-up capital of over $322 million',
    'over 1,000,000+ customers',
    'across 90 countries'
]

export const whyMultiBankExtraBenefitsSnippets: string[] = [
    'Funds withdrawal has been made easy and accessible',
    'State-of-the-art trading platforms',
    'Trade over 20,000 instruments including Forex, Metals, Shares, Indices, Commodities & Cryptocurrencies',
    'Zero Commission Trading',
    'Negative Balance Protection',
    'No requotes and No Rejections',
    'No Restrictions on EA',
    'turnover of over US$ 6.8 Trillion in 2020',
    '20+ offices located within the financial centers of the world'
]

export const whyMultiBankComplianceConfig: WhyMultiBankComplianceConfig = {
    title: 'ASIC MEX Exchange',
    descriptionSnippets: [
        'MEX Digital Pty Ltd',
        'Australian company number',
        'authorized and regulated by the Australian Securities and Investment Commission'
    ],
    licenseLinkText: 'View License'
}

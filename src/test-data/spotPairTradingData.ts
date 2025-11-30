export const spotPairTableHeader= [
    'Pair',
    'Price',
    '24h Change'
]

export const spotOrderBookTableHeader= [
    `Price()`,
    'Price',
    '24h Change'
]

export const spotPairTradingData = {
    btcUsdt: {
        search: 'BTC-USDT',
        urlSuffix: '/trade/BTC_USDT',
        base: 'BTC',
        second: 'USDT'
    },
    ethUsdt: {
        search: 'ETH-USDT',
        urlSuffix: 'ETH_USDT',
        base: 'ETH',
        second: 'USDT'
    }
} as const

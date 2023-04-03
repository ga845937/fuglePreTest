import { IJSONSchemaType } from "../utils/utils";

export const currencyArray = ["btcusd", "btceur", "btcgbp", "btcpax", "gbpusd", "gbpeur", "eurusd", "xrpusd", "xrpeur", "xrpbtc", "xrpgbp", "ltcbtc", "ltcusd", "ltceur", "ltcgbp", "ethbtc", "ethusd", "etheur", "ethgbp", "ethpax", "bchusd", "bcheur", "bchbtc", "paxusd", "xlmbtc", "xlmusd", "xlmeur", "xlmgbp", "linkusd", "linkeur", "linkgbp", "linkbtc", "omgusd", "omgeur", "omggbp", "omgbtc", "usdcusd", "usdceur", "btcusdc", "ethusdc", "eth2eth", "aaveusd", "aaveeur", "aavebtc", "batusd", "bateur", "umausd", "umaeur", "daiusd", "kncusd", "knceur", "mkrusd", "mkreur", "zrxusd", "zrxeur", "gusdusd", "algousd", "algoeur", "algobtc", "audiousd", "audioeur", "audiobtc", "crvusd", "crveur", "snxusd", "snxeur", "uniusd", "unieur", "unibtc", "yfiusd", "yfieur", "compusd", "compeur", "grtusd", "grteur", "lrcusd", "lrceur", "usdtusd", "usdteur", "usdcusdt", "btcusdt", "ethusdt", "xrpusdt", "eurteur", "eurtusd", "flrusd", "flreur", "manausd", "manaeur", "maticusd", "maticeur", "sushiusd", "sushieur", "chzusd", "chzeur", "enjusd", "enjeur", "hbarusd", "hbareur", "alphausd", "alphaeur", "axsusd", "axseur", "sandusd", "sandeur", "storjusd", "storjeur", "adausd", "adaeur", "adabtc", "fetusd", "feteur", "sklusd", "skleur", "slpusd", "slpeur", "sxpusd", "sxpeur", "sgbusd", "sgbeur", "avaxusd", "avaxeur", "dydxusd", "dydxeur", "ftmusd", "ftmeur", "shibusd", "shibeur", "ampusd", "ampeur", "ensusd", "enseur", "galausd", "galaeur", "perpusd", "perpeur", "wbtcbtc", "ctsiusd", "ctsieur", "cvxusd", "cvxeur", "imxusd", "imxeur", "nexousd", "nexoeur", "antusd", "anteur", "godsusd", "godseur", "radusd", "radeur", "bandusd", "bandeur", "injusd", "injeur", "rlyusd", "rlyeur", "rndrusd", "rndreur", "vegausd", "vegaeur", "1inchusd", "1incheur", "solusd", "soleur", "apeusd", "apeeur", "mplusd", "mpleur", "eurocusdc", "euroceur", "dotusd", "doteur", "nearusd", "neareur", "dogeusd", "dogeeur"] as const;
export type Currency = typeof currencyArray[number];

export const eventArray = ["subscribe", "unsubscribe"];
export type Event = typeof eventArray[number];

export interface ISubscribeOrNot {
    currency: Currency[],
    event: Event
}

export type ISubscribeOrNotType = {
    [K in keyof ISubscribeOrNot]: IJSONSchemaType
}

interface IBitstampSubscribeSubData {
    id: number,
    timestamp: string,
    amount: number,
    amount_str: string,
    price: number,
    price_str: string,
    type: number,
    microtimestamp: string,
    buy_order_id: number,
    sell_order_id: number
}

export interface IBitstampSubscribeData {
    channel: string
    data: IBitstampSubscribeSubData
    event: string
}

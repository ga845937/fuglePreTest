import { Currency } from "../../schema/ws/bitstamp";
import { redisClient, redisPubClient, redisSubClient } from "../../database/redis";
import { WebSocket } from "ws";

export const lRange = async (key: string, start = 0, stop = -1) => {
    const result = await redisClient.lRange(key, start, stop);
    return result;
};

export const rPush = async (key: string, value: string) => {
    await redisClient.rPush(key, value);
};

export const lTrim = async (key: string, start: number, stop = -1) => {
    await redisClient.lTrim(key, start, stop);
};

export const hSet = async (key: string, field: string, value: string) => {
    await redisClient.hSet(key, field, value);
};

export const hGet = async (key: string, field: string) => {
    await redisClient.hGet(key, field);
};

export const publish = async (key: string, value: string) => {
    await redisPubClient.publish(key, value);
};

export const subscribe = async (key: string, ws: WebSocket, currency: Currency) => {
    await redisSubClient.subscribe(key, async (message) => {
        const nowUnixWithoutMS = Math.floor(Date.now() / 1000);
        const lastMinuteUnix = nowUnixWithoutMS - 60;
        const ohlcData = Object.values(await redisClient.hGetAll(key)).map(x => JSON.parse(x)).filter(x => nowUnixWithoutMS >= Number(x.timestamp) && Number(x.timestamp) >= lastMinuteUnix);
        const ohlc = {
            open: ohlcData[0].price,
            high: Math.max(...ohlcData.map(x => x.price)),
            low: Math.min(...ohlcData.map(x => x.price)),
            close: ohlcData[ohlcData.length - 1].price
        };
        const data = JSON.stringify({
            currency,
            data: JSON.parse(message),
            ohlc
        });
        ws.send(data);
    });
};

export const unsubscribe = async (key: string) => {
    await redisSubClient.unsubscribe(key);
};

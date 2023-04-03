import { subscribeOrNotValidate } from "../../model/ws/bitstamp";
import { ISubscribeOrNot, IBitstampSubscribeData } from "../../schema/ws/bitstamp";
import { bitstampWss } from "../../ws/bitstamp";
import { subscribe, unsubscribe, hSet, publish } from "../../dao/utils/redis";
import { WebSocket } from "ws";

export const subscribeBitstamp = async (params: ISubscribeOrNot, ws: WebSocket) => {
    if (!subscribeOrNotValidate(params)) {
        if (subscribeOrNotValidate.errors) {
            throw new Error(`${subscribeOrNotValidate.errors[0].instancePath}: ${subscribeOrNotValidate.errors[0].message}`);
        }
    }

    for (const currency of params.currency) {
        const channel = `live_trades_${currency}`;
        const subscribeKey = `bitstamps_trade:${channel}`;
        await subscribe(subscribeKey, ws, currency);
        const subscriptions = JSON.stringify({
            event: "bts:subscribe",
            data: { channel }
        });
        bitstampWss.send(subscriptions);
    }
};

export const unSubscribeBitstamp = async (params: ISubscribeOrNot) => {
    if (!subscribeOrNotValidate(params)) {
        if (subscribeOrNotValidate.errors) {
            throw new Error(`${subscribeOrNotValidate.errors[0].instancePath}: ${subscribeOrNotValidate.errors[0].message}`);
        }
    }

    for (const currency of params.currency) {
        const channel = `live_trades_${currency}`;
        await unsubscribe(`bitstamps_trade:${channel}`);
        const subscriptions = JSON.stringify({
            event: "bts:unsubscribe",
            data: { channel }
        });
        bitstampWss.send(subscriptions);
    }
};

export const createBitstampSubscribeData = async (params: IBitstampSubscribeData) => {
    const storeKey = params.data.microtimestamp.substring(0, params.data.microtimestamp.length - 3);
    await hSet(`bitstamps_${params.event}:${params.channel}`, storeKey, JSON.stringify(params.data));
};

export const publishBitstampData = async (params: IBitstampSubscribeData) => {
    await publish(`bitstamps_${params.event}:${params.channel}`, JSON.stringify(params.data));
};

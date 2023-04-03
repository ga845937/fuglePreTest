import WebSocket from "ws";
import { IBitstampSubscribeData } from "../schema/ws/bitstamp";
import { createBitstampSubscribeData, publishBitstampData } from "../service/ws/bitstamps";

export const bitstampWss = new WebSocket("wss://ws.bitstamp.net");

bitstampWss.on("error", console.error);

bitstampWss.on("message", (data, isBinary) => {
    const message = isBinary ? data : data.toString();
    const bitstampData: IBitstampSubscribeData = JSON.parse(message as string);
    if (bitstampData.event === "trade") {
        createBitstampSubscribeData(bitstampData);
        publishBitstampData(bitstampData);
    }
});

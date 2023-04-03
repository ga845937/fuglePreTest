import { Server } from "ws";
import { typeCasting } from "../utils/utils";
import { subscribeOrNotProp } from "../model/ws/bitstamp";
import { ISubscribeOrNot } from "../schema/ws/bitstamp";
import { subscribeBitstamp, unSubscribeBitstamp } from "../service/ws/bitstamps";

export const indexWS = function (wss: Server) {
    wss.on("connection", (ws) => {
        ws.on("error", console.error);

        ws.on("message", async (data, isBinary) => {
            try {
                const message = isBinary ? data : data.toString();
                const origReq = JSON.parse(message as string);
                const reqData = await typeCasting(subscribeOrNotProp, origReq) as ISubscribeOrNot;
                switch (reqData.event) {
                    case "subscribe": {
                        await subscribeBitstamp(reqData, ws);
                        break;
                    }
                    case "unsubscribe": {
                        await unSubscribeBitstamp(reqData);
                        break;
                    }
                    default:
                        ws.send("event錯誤");
                        break;
                }

            }
            catch (err) {
                console.log(err);
                ws.send(err.message);
            }
        });
    });
};

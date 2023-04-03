import { redisConf } from "../env";
import { createClient } from "redis";

export const redisClient = createClient({
    url: `redis://${redisConf.host}:${redisConf.port}`
});

export const redisPubClient = createClient({
    url: `redis://${redisConf.host}:${redisConf.port}/${redisConf.subscribeDataBase}`
});

export const redisSubClient = createClient({
    url: `redis://${redisConf.host}:${redisConf.port}/${redisConf.subscribeDataBase}`
});

redisClient.on("error", err => console.log("Redis Client Error", err));

(async function () {
    await redisClient.connect();
    await redisPubClient.connect();
    await redisSubClient.connect();
})();

import { lRange, rPush, lTrim } from "../dao/utils/redis";

interface JSONObject {
    [key: string]: any;
}

export const typeCasting = async function (modelProp: JSONObject, origParam: JSONObject) {
    for (const key in modelProp) {
        if (!origParam[key]) {
            continue;
        }
        const propType = modelProp[key].type;
        switch (propType) {
            case "string":
                origParam[key] = String(origParam[key]);
                break;
            case "boolean":
            case "object":
            case "array":
                if (typeof origParam[key] === "string") {
                    origParam[key] = JSON.parse(origParam[key]);
                }
                break;
            case "integer":
            case "number":
                origParam[key] = Number(origParam[key]);
                if (isNaN(origParam[key])) {
                    const err = new Error(`TypeError property '${key}'`);
                    throw err;
                }
                break;
        }
    }
    return origParam;

};

export const rateLimit = async (groupKey: string, subKey: string, unixTime: string, limit: number) => {
    try {
        const result = {
            pass: true,
            num: 0
        };
        const value = await lRange(`${groupKey}:${subKey}`);
        if (!value) {
            await rPush(`${groupKey}:${subKey}`, unixTime);
            result.num = 1;
        }
        else {
            const newValue = value.filter(x => (parseInt(x) + 60 * 1000) > parseInt(unixTime));
            result.num = newValue.length;
            if (result.num > limit) {
                result.pass = false;
            }
            if (result.pass) {
                await rPush(`${groupKey}:${subKey}`, unixTime);
            }
            const stayStartIndex = value.findIndex(x => x === newValue[0]);
            await lTrim(`${groupKey}:${subKey}`, stayStartIndex, -1);
        }
        return result;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};

export const readRateLimitNum = async (groupKey: string, subKey: string, unixTime: string) => {
    try {
        const origValue = await lRange(`${groupKey}:${subKey}`);
        const num = origValue.filter(x => (parseInt(x) + 60 * 1000) > parseInt(unixTime)).length;
        return num;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};

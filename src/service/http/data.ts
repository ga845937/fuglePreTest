import { readDataValidate } from "../../model/http/data";
import { IReadData } from "../../schema/http/data";

export const readData = async (params: IReadData) => {
    if (!readDataValidate(params)) {
        if (readDataValidate.errors) {
            throw new Error(readDataValidate.errors[0].message);
        }
    }

    const dataURL = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
    const dataRequest = await fetch(dataURL);
    const rtn = {
        result: await dataRequest.json()
    };
    return rtn;
};

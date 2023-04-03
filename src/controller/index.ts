import { Request, Response } from "express";
import { rateLimit, readRateLimitNum, typeCasting } from "../utils/utils";
import { readDataProp } from "../model/http/data";
import { IReadData } from "../schema/http/data";
import { readData } from "../service/http/data";

class IndexController {
    async main(req: Request, res: Response) {
        res.render("index");
    }
    async readData(req: Request, res: Response) {
        try {
            const baseUrl = req.baseUrl;
            const now = Date.now().toString();
            const ip = req.ip.replace(/::ffff:/, "");
            const param = await typeCasting(readDataProp, req.query) as IReadData;
            const rateLimitUserResult = await rateLimit(baseUrl, param.user.toString(), now, 5);
            let rtn;
            if (!rateLimitUserResult.pass) {
                rtn = {
                    ip: await readRateLimitNum(baseUrl, ip, now),
                    id: rateLimitUserResult.num
                };
                return res.status(429).json(rtn);
            }
            const rateLimitIPResult = await rateLimit(baseUrl, ip, now, 10);
            if (!rateLimitUserResult.pass) {
                rtn = {
                    ip: rateLimitIPResult.num,
                    id: rateLimitUserResult.num
                };
                return res.status(429).json(rtn);
            }
            rtn = await readData(param);
            res.json(rtn);
        }
        catch (err) {
            console.log(err);
            res.status(500).json();
        }
    }
}
export const indexController = new IndexController();

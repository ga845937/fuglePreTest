import { Request, Response, NextFunction } from "express";
import { rateLimit as rateLimitUtil } from "../utils/utils";

export const rateLimit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rateLimitResult = await rateLimitUtil(req.baseUrl, req.ip.replace(/::ffff:/, ""), Date.now().toString(), 10);
        if (!rateLimitResult.pass) {
            const rtn = {
                ip: rateLimitResult.num
            };
            return res.status(429).json(rtn);
        }
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500).json();
    }
};

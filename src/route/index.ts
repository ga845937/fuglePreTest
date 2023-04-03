import express, { Router } from "express";
import { indexController } from "../controller/index";
//import { rateLimit } from "../middleware/rateLimit";

class IndexRouter {
    router: Router;
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", indexController.readData);
        this.router.get("/ws", indexController.main);
    }
}

export const indexRouter = new IndexRouter;

import { createServer } from "http";
import express from "express";
import { WebSocketServer } from "ws";

import cookieParser from "cookie-parser";
import path from "path";
import { indexRouter } from "./route/index";
import { indexWS } from "./ws/indexWS";

const app = express();
app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/tsPublic", express.static(path.join(__dirname, "public")));

app.use("/data", indexRouter.router);

const httpServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer, path: "/streaming" });
indexWS(wss);
httpServer.listen(3000);

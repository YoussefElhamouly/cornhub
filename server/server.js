import express from "express";
import { createServer } from "http";
import initSocket from "./socket.js";
import initRedis, { getRedisClient } from "./redis/redis.js";
import initMongo from "./models/mongo.js";
import session from "express-session";
import { RedisStore } from "connect-redis";
import errorHandler from "./middlewares/errorHandler.js";
const serverPort = process.env.SERVER_PORT || 3000;

const app = express();
const server = createServer(app);
initSocket(server);
initMongo();
initRedis();

const redisClient = getRedisClient();
const sessionStore = new RedisStore({ client: redisClient });

app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.get("/", (req, res) => {
  return res.json({ message: "ur mom" });
});

app.use(errorHandler);
app.listen(serverPort, () => {
  console.log(`server is up at ${serverPort}`);
});

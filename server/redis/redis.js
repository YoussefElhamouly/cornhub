import { createClient } from "redis";
const redisPort = process.env.REDIS_PORT || 6379;
let redisClient = null;
export default function initRedis() {
  redisClient = createClient(redisPort);
  redisClient
    .connect()
    .then(() => {
      console.log(`redis is up at ${redisPort}`);
    })
    .catch(() => {
      console.error("redis is down bro ):");
    });
}
export function getRedisClient() {
  if (redisClient) return redisClient;
}

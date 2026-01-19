import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/cornhub";
let mongoInstance = null;

export default function initMongo() {
  mongoose
    .connect(mongoUri)
    .then(() => {
      mongoInstance = mongoose;
      console.log(`MongoDB is up at ${mongoUri}`);
    })
    .catch(() => {
      console.error("mongo is down bro :(");
    });
}

export function getMongoClient() {
  if (mongoInstance) return mongoInstance;
}

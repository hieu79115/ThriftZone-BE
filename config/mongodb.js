import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();
if (!process.env.MONGODB_URI) {
    throw new Error('Add Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;

const options = {};
let client;
let db;

async function connectDB() {
    if (!client) {
      client = new MongoClient(uri, options);
      await client.connect();
      db = client.db(process.env.DB_NAME);
      console.log("Connected to MongoDB");
    }
    return { db, client };
  }
export { connectDB };
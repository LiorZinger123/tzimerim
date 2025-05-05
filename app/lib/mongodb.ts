import { Db, MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI || '');
const dbName = process.env.MONGODB_DB;

let cachedDb: Db | null = null;

export async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }

    await client.connect();
    cachedDb = client.db(dbName);
    return cachedDb;
}

import dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config();

const MONGO_URI: string = process.env.MONGO_URI || 'erroringURI'; // TS won't allow a process.env

export default async function connectToDB(): Promise<void> {
    try {
        const conn = await connect(MONGO_URI);
        console.log(`MongoDB connected to ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection failed: ${error}`);
        process.exit(1);
    }
}

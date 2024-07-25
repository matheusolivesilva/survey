import mongoose from "mongoose";
import Connection from "./Connection";

export default class MongoDBConnection implements Connection {
  constructor() {
    if (process.env.IS_TESTING !== "true") {
      mongoose.connect(process.env.DATABASE_URL as string);
    }
  }

  async close(): Promise<void> {
    await mongoose.connection.close();
  }
}

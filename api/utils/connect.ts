import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connect() {
  const dbUri = config.get<string>("mongodb+srv://abdulsittar72:2106010991As@cluster0.gsnbbwq.mongodb.net/?retryWrites=true&w=majority");

  try {
    await mongoose.connect(dbUri);
    logger.info("DB connected");
  } catch (error) {
    logger.error("Could not connect to db");
    process.exit(1);
  }
}

export default connect;
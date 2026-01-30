import mongoose from "mongoose";
import config from "../config.js";

const connectMongo = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log(" MongoDB conectado");
  } catch (error) {
    console.error(" Error conectando a MongoDB", error);
    process.exit(1);
  }
};

export default connectMongo;

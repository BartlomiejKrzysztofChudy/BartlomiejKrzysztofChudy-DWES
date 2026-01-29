import express from "express";
import connectMongo from "./loaders/mongodb-loader.js";
import loadModels from "./loaders/models-loader.js";

const app = express();

const startApp = async () => {
  await connectMongo();
  loadModels();
};

startApp();

export default app;

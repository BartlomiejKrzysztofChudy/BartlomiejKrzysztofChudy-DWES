import 'dotenv/config';
import app from "./app.js";
import connectMongo from "./loaders/mongodb-loader.js";
import loadModels from "./loaders/models-loader.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectMongo();
  loadModels();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

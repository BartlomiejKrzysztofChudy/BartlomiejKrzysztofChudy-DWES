import 'dotenv/config';
import app from "../src/app.js";
import connectMongo from "../src/loaders/mongodb-loader.js";
import loadModels from "../src/loaders/models-loader.js";

let isInitialized = false;

const init = async () => {
  if (!isInitialized) {
    await connectMongo();
    loadModels();
    isInitialized = true;
  }
};

export default async function handler(req, res) {
  try {
    await init();
    
    // Express necesita que se maneje como middleware
    app(req, res);
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}

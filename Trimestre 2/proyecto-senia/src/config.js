const config = {
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/gestion_academica",
  port: process.env.PORT || 3000
};

export default config;

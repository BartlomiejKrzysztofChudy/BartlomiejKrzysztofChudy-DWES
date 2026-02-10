import express from "express";
import cors from "cors";

import setupSwagger from "./openapi/index.js";
import routes from "./routes/index.js";

const app = express();

// CORS - Permitir peticiones desde cualquier origen
app.use(cors());

app.use(express.json());

setupSwagger(app);

app.use(routes);

export default app;

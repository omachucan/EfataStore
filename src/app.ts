import express from "express";
import cors, { CorsOptions } from "cors";
import { corsOptions } from "./config/cors";
import morgan from "morgan";
import router from "./router";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

// Instancia de express
const app = express();

// Permitir Conexiones
app.use(cors(corsOptions));

// Middlewares

//Leer datos de formularios
app.use(express.json());

// Looger datos
app.use(morgan("dev"));

//Routes
app.use("/api/products", router);

//Docs
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default app;

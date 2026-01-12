import dotenv from "dotenv";
dotenv.config({
  quiet: true,
});
import { startServer } from "./server";
const port = Number(process.env.PORT) || 4000;

startServer(port);

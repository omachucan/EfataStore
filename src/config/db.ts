import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import Product from "../models/Product.model";
// import Product from "../models/Product.model";

// dotenv.config();

const isDevOrProd = ["development", "production"].includes(
  process.env.NODE_ENV ?? ""
);

const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [Product],
  // models: [__dirname + "/../models/**/*.ts"],
  logging: false,
  dialectOptions: isDevOrProd
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

export default db;

import app from "./app";
import db from "./config/db";
import chalk from "chalk";

// Conectar a base de datos
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(chalk.blue.bold("Conexión exitosa a la Base de Datos"));
  } catch (error) {
    console.log(error);
    console.log(chalk.red.bold("Hubo un error de conexión"));
    process.exit(1);
  }
}

export async function startServer(port: number) {
  await connectDB();

  app.listen(port, () => {
    console.log(chalk.blue.bold(`REST API en el puerto ${port}`));
  });
}

// connectDB();

import db from "../config/db";

function maskDbUrl(url: string) {
  // Oculta password en postgres://user:pass@host/db
  return url.replace(/\/\/([^:]+):([^@]+)@/, "//$1:****@");
}

export async function setupTestDb(expectedDbName = "efatastore_test") {
  const dbUrl = process.env.DATABASE_URL || "";

  const isSafe =
    process.env.NODE_ENV === "test" && dbUrl.includes(expectedDbName);

  if (!isSafe) {
    throw new Error(
      [
        "Entorno inseguro para ejecutar db.sync({ force: true }). Abortando.",
        `NODE_ENV=${process.env.NODE_ENV}`,
        `DATABASE_URL=${dbUrl ? maskDbUrl(dbUrl) : "undefined"}`,
        `EXPECTED_DB_NAME=${expectedDbName}`,
      ].join("\n")
    );
  }

  await db.authenticate();
  await db.sync({ force: true });
}

export async function teardownTestDb() {
  await db.close();
}

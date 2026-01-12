import { CorsOptions } from "cors";

const allowlist = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean) as string[];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Permitir requests sin Origin (Postman, tests, Swagger)
    if (!origin) {
      return callback(null, true);
    }

    if (allowlist.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS bloqueado para el origen: ${origin}`));
  },

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // solo si usarás cookies
};

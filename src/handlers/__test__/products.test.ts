import request from "supertest";
import app from "../../app";
import { setupTestDb, teardownTestDb } from "../../test/testDb";

beforeAll(async () => {
  await setupTestDb("efatastore_test"); // recrea tablas solo en test
});

afterAll(async () => {
  await teardownTestDb();
});

describe("POST /api/products", () => {
  test("Should display validation errors", async () => {
    const res = await request(app).post("/api/products").send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(4);

    expect(res.status).not.toBe(404);
    expect(res.body.errors).not.toHaveLength(2);
  });

  test("Should validate that the price is greater than 0", async () => {
    const res = await request(app).post("/api/products").send({
      name: "Monitor Prueba",
      price: 0,
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(1);

    expect(res.status).not.toBe(404);
    expect(res.body.errors).not.toHaveLength(2);
  });

  test("Should validate that the price is number and greater than 0", async () => {
    const res = await request(app).post("/api/products").send({
      name: "Monitor Prueba",
      price: "Hola",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(2);

    expect(res.status).not.toBe(404);
    expect(res.body.errors).not.toHaveLength(4);
  });

  test("Should create a new product", async () => {
    const res = await request(app).post("/api/products").send({
      name: "Mouse - Testing",
      price: 60,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");

    expect(res.status).not.toBe(404);
    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products", () => {
  test("Should chack if api/products url exits", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).not.toBe(400);
  });
  test("GET a JSON response with products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveLength(1);

    expect(res.status).not.toBe(404);
    expect(res.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products/:id", () => {
  test("Should return a 404 response for a non-existent product", async () => {
    const productId = 2000;
    const res = await request(app).get(`/api/products/${productId}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("Producto No Encontrado");
  });

  test("Should check a valid ID int the URL", async () => {
    const res = await request(app).get("/api/products/not-valid-url");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0].msg).toBe("ID no válido");
  });

  test("GET a JSON response for a single product", async () => {
    const res = await request(app).get("/api/products/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
  });
});

describe("PUT /api/products/:id", () => {
  test("Should check a valid ID int the URL", async () => {
    const res = await request(app).get("/api/products/not-valid-url");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0].msg).toBe("ID no válido");
  });

  test("Should display validation error messages when updating a product", async () => {
    const res = await request(app).put("/api/products/1").send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toBeTruthy();
    expect(res.body.errors).toHaveLength(5);

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  test("Should validate that the price is greater than 0", async () => {
    const res = await request(app).put("/api/products/1").send({
      name: "Producto Actualizado Prueba Test",
      price: 0,
      availability: true,
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toBeTruthy();
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0].msg).toBe("Precio no válido");

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  test("Should return a 404 response for a non-existent product", async () => {
    const productId = 3000;
    const res = await request(app).put(`/api/products/${productId}`).send({
      name: "Producto Actualizado Prueba Test",
      price: 300,
      availability: true,
    });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Producto No Encontrado");

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  test("Should update an existent product with valid data", async () => {
    const res = await request(app).put("/api/products/1").send({
      name: "Producto Actualizado Prueba Test",
      price: 300,
      availability: true,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");

    expect(res.status).not.toBe(400);
    expect(res.body).not.toHaveProperty("errors");
  });
});

describe("PATCH /api/products/:id", () => {
  test("Should return a 404 response for a non-existent product", async () => {
    const productId = 3000;
    const res = await request(app).patch(`/api/products/${productId}`);

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Producto No Encontrado");

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  test("Should update the product availability", async () => {
    const res = await request(app).patch("/api/products/1");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.availability).toBe(false);

    expect(res.status).not.toBe(404);
    expect(res.status).not.toBe(400);
    expect(res.body).not.toHaveProperty("error");
  });
});

describe("DELETE /api/product/:id", () => {
  test("Should check a valid ID", async () => {
    const res = await request(app).delete("/api/products/not-valid");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toBe("ID no válido");
  });

  test("Should return a 404 response for a non-existent product", async () => {
    const productId = 40000;
    const res = await request(app).delete(`/api/products/${productId}`);
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Producto No Encontrado");

    expect(res.status).not.toBe(200);
  });

  test("Should delete an existent product", async () => {
    const res = await request(app).delete(`/api/products/1`);
    expect(res.status).toBe(204);

    expect(res.status).not.toBe(400);
    expect(res.status).not.toBe(404);
  });
});

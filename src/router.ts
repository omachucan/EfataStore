import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/products";
import {
  productByIdValidator,
  productUpdateValidator,
  productValidator,
} from "./validators";
import { handleInputErrors } from "./middleware";

const router = Router();

/**
 * @swagger
 * components:
 *    schemas:
 *        ErrorResponse:
 *            type: object
 *            required: [message, code]
 *            properties:
 *                message:
 *                    type: string
 *                    example: Product not found
 *                code:
 *                    type: string
 *                    description: Application-specific error code
 *                    enum:
 *                        - VALIDATION_ERROR
 *                        - PRODUCT_NOT_FOUND
 *                        - INVALID_ID
 *                        - UNAUTHORIZED
 *                        - FORBIDDEN
 *                        - INTERNAL_ERROR
 *                details:
 *                    type: object
 *                    additionalProperties: true
 *                    description: Optional machine-readable details (validation fields, etc.)
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The Unique Product Identifier
 *           example: 1
 *         name:
 *           type: string
 *           description: The Product name
 *           example: "Laptop Gamer"
 *         price:
 *           type: number
 *           format: float
 *           description: The Product price
 *           example: 2500.50
 *         available:
 *           type: boolean
 *           description: The Product availability
 *           example: true
 *
 */

// Routing

/**
 * * Obtener Todos los Productos
 */

/**
 * @swagger
 * /api/products:
 *    get:
 *        summary: Get a List of products.
 *        tags:
 *            - Products
 *        description: Return a list of products.
 *        responses:
 *            200:
 *                description: Successful Response
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: array
 *                            items:
 *                                $ref: '#/components/schemas/Product'
 */
router.get("/", getProducts);

/**
 * * Obtener un Producto por su ID
 */

/**
 * @swagger
 * /api/products/{id}:
 *    get:
 *        summary: Get a product by ID.
 *        tags:
 *            - Products
 *        description: Return a product based on its unique ID
 *        parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *                  format: int64
 *        responses:
 *            200:
 *                description: Successful Response
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Product'
 *            400:
 *                description: Bad Request - Invalid ID
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/ErrorResponse'
 *                        examples:
 *                            invalidId:
 *                                summary: InvalidId
 *                                value: {"code": "INVALID_ID", "message": "Invalid Id", "details": {"id": "Requerid"}}
 *            404:
 *                description: Not Found
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/ErrorResponse'
 *                        examples:
 *                            notFound:
 *                                value: {"code": "PRODUCT_NOT_FOUND", "message": "Product not found"}
 *
 *
 */

router.get("/:id", productByIdValidator, handleInputErrors, getProductById);

/**
 * * Registar un Nuevo Producto
 */

/**
 * @swagger
 * /api/products:
 *    post:
 *        summary: Create a new Product
 *        tags:
 *            - Products
 *        description: Returns a new record in the database
 *        requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                    schema:
 *                        type: object
 *                        properties:
 *                            name:
 *                                type: string
 *                                example: "Monitor Curvo 50 Pulgadas"
 *                            price:
 *                                type: number
 *                                example: 500
 *        responses:
 *            201:
 *                description: Product created successfully
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Product'
 *            400:
 *                description: Bad Request - Invalid Input Data
 *
 */

router.post("/", productValidator, handleInputErrors, createProduct);

/**
 * * Actualizar un Producto en Especifico
 */

/**
 * @swagger
 * /api/products/{id}:
 *    put:
 *        summary: Updates a product with user input
 *        tags:
 *            - Products
 *        description: Returns the updated product
 *        parameters:
 *            - in: path
 *              name: id
 *              requerid: true
 *              description: The ID of the product to retrieve
 *              schema:
 *                  type: integer
 *                  format: int64
 *        requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                    schema:
 *                        type: object
 *                        properties:
 *                            name:
 *                                type: string
 *                                example: "Monitor Curvo 50 Pulgadas"
 *                            price:
 *                                type: number
 *                                example: 500
 *                            availability:
 *                                type: boolean
 *                                example: true
 *        responses:
 *            200:
 *                description: Succesfull Response
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Product'
 *            400:
 *                description: Bad Request - Invalid ID or Input Data
 *            404:
 *                description: Product Not Found
 *
 *
 *
 */

router.put("/:id", productUpdateValidator, handleInputErrors, updateProduct);

/**
 * * Actualizar un Producto en Especifico
 */

/**
 * @swagger
 * /api/products/{id}:
 *    patch:
 *        summary: Update Product Availability
 *        tags:
 *            - Products
 *        description: Returns the updated availability
 *        parameters:
 *            - in: path
 *              name: id
 *              requerid: true
 *              description: The ID of the product to retrieve
 *              schema:
 *                  type: integer
 *                  format: int64
 *        responses:
 *            200:
 *                description: Succesfull Response
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Product'
 *            400:
 *                description: Bad Request - Invalid ID or Input Data
 *            404:
 *                description: Product Not Found
 *
 */

router.patch(
  "/:id",
  productByIdValidator,
  handleInputErrors,
  updateAvailability
);

/**
 * * Eliminar un Producto en Especifico
 */

/**
 * @swagger
 * /api/products/{id}:
 *    delete:
 *        summary: Delete a product by ID
 *        tags:
 *            - Products
 *        description: Deletes a product. Return 204 if deleted.
 *        parameters:
 *            - in: path
 *              name: id
 *              requerid: true
 *              description: The ID of the product to delete
 *              schema:
 *                  type: integer
 *                  format: int64
 *        responses:
 *            204:
 *                description: Product deleted successfully (No Content)
 *            404:
 *                description: Product Not Found
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/ErrorResponse'
 *                        examples:
 *                            notFound:
 *                                value: {"code": "PRODUCT_NOT_FOUND", "message": "Product not found"}
 *            500:
 *                description: Internal Server Error
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/ErrorResponse'
 *                        example:
 *                            serverError:
 *                                value: {"code": "INTERNAL_ERROR", "message": "Internal Server Error"}
 *
 */
router.delete("/:id", productByIdValidator, handleInputErrors, deleteProduct);

export default router;

import { body, param } from "express-validator";

export const baseProductValidator = [
  body("name")
    .notEmpty()
    .withMessage("El nombre de Producto no puede ir vacío"),

  body("price")
    .notEmpty()
    .withMessage("El precio de Producto no puede ir vacío")
    .isNumeric()
    .withMessage("Valor no válido")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"),
];

export const productValidator = [
  // Validación
  ...baseProductValidator,
];

export const productByIdValidator = [
  param("id").isInt().withMessage("ID no válido"),
];

export const productUpdateValidator = [
  // Validación
  ...baseProductValidator,
  ...productByIdValidator,
  body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no Válido"),
];

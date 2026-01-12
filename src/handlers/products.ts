import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [["price", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
      // attributes: { exclude: ["createdAt", "updatedAt", "availability"] },
    });
    res.json({ data: products });
  } catch (error) {
    console.log(error);
  }
};
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      // order: [["price", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt", "availability"] },
    });

    if (!product)
      return res.status(404).json({ error: "Producto No Encontrado" });
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  //   const product = new Product(req.body);
  //   const savedProduct = await product.save();

  //Crea la instancia y lo almacena en la base de datos en un solo paso.

  try {
    const product = await Product.create(req.body);
    return res.status(201).json({ data: product });
  } catch (error) {
    console.error("createProduct error:", error);
    return res.status(500).json({ error: "No se pudo crear el producto" });
  }

  //   console.log(savedProduct);
  //   console.log("data", { data: savedProduct });

  //   res.json("Desde el metodo Post");
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    // Obtine el Producto
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).json({ error: "Producto No Encontrado" });

    // Vamos a realizar la actualización
    await product.update(req.body);
    await product.save();

    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};
export const updateAvailability = async (req: Request, res: Response) => {
  try {
    // Obtine el Producto
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).json({ error: "Producto No Encontrado" });

    // Vamos a realizar la actualización
    product.availability = !product.dataValues.availability;
    await product.save();

    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    // Obtine el Producto
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).json({ error: "Producto No Encontrado" });

    // Vamos a realizar la actualización

    await product.destroy();

    // res.json("Producto Eliminado");
    return res.status(204).send();
  } catch (error) {
    console.error("deleteProduct error:", error);
    return res.status(500).json({ error: "No se pudo eliminar el producto" });
  }
};

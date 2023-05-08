import express from "express";
import { ProductController } from "../controllers/ProductController";
import { ProductService } from "../services/product.service";

const router = express.Router();

const productController = new ProductController(new ProductService());

router.get('/product', productController.getAllProduct.bind(productController));
router.get('/product/:slug', productController.getProductBySlug.bind(productController));
router.post('/product/create', productController.createProduct.bind(productController));
router.put('/product/update/:id', productController.updateProduct.bind(productController));
router.delete('/product/delete/:id', productController.deleteContact.bind(productController));

export default router;
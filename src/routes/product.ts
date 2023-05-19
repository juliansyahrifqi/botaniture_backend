import express from "express";
import { ProductController } from "../controllers/ProductController";
import { ProductService } from "../services/product.service";
import { authenticateJWT } from "../middlewares/jwtMiddleware";

const router = express.Router();

const productController = new ProductController(new ProductService());

router.get('/product', productController.getAllProduct.bind(productController));
router.get('/product/:slug', productController.getProductBySlug.bind(productController));
router.post('/product/create', authenticateJWT, productController.createProduct.bind(productController));
router.put('/product/update/:id', authenticateJWT, productController.updateProduct.bind(productController));
router.delete('/product/delete/:id', authenticateJWT, productController.deleteContact.bind(productController));

export default router;
import express from "express";
import { ProductCategoryController } from "../controllers/ProductCategoryController";
import { ProductCategoryService } from "../services/product-category.service";
import { authenticateJWT } from "../middlewares/jwtMiddleware";

const router = express.Router();

const productCategoryController = new ProductCategoryController(new ProductCategoryService());

router.get('/product-category', productCategoryController.getAllProductCategory.bind(productCategoryController));
router.post('/product-category/create', authenticateJWT, productCategoryController.createProductCategory.bind(productCategoryController));
router.put('/product-category/update/:id', authenticateJWT, productCategoryController.updateProductCategory.bind(productCategoryController));
router.delete('/product-category/delete/:id', authenticateJWT, productCategoryController.deleteProductCategory.bind(productCategoryController));

export default router;
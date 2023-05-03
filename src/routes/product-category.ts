import express from "express";
import { ProductCategoryController } from "../controllers/ProductCategoryController";
import { ProductCategoryService } from "../services/product-category.service";

const router = express.Router();

const productCategoryController = new ProductCategoryController(new ProductCategoryService());

router.get('/product-category', productCategoryController.getAllProductCategory.bind(productCategoryController));
router.post('/product-category/create', productCategoryController.createProductCategory.bind(productCategoryController));
router.put('/product-category/update/:id', productCategoryController.updateProductCategory.bind(productCategoryController));
router.delete('/product-category/delete/:id', productCategoryController.deleteProductCategory.bind(productCategoryController));

export default router;
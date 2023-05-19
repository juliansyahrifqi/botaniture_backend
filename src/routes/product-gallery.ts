import express from "express";
import { ProductGalleryController } from "../controllers/ProductGalleryController";
import { ProductGalleryService } from "../services/product-gallery.service";
import { authenticateJWT } from "../middlewares/jwtMiddleware";

const router = express.Router();

const productGalleryController = new ProductGalleryController(new ProductGalleryService());

router.post('/product-gallery/create', authenticateJWT, productGalleryController.createProductGallery.bind(productGalleryController));
router.put('/product-gallery/update/:id', authenticateJWT, productGalleryController.updateProductGallery.bind(productGalleryController));
router.delete('/product-gallery/delete/:id', authenticateJWT, productGalleryController.deleteProductGallery.bind(productGalleryController));

export default router;
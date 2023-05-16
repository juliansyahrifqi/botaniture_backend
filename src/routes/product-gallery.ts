import express from "express";
import { ProductGalleryController } from "../controllers/ProductGalleryController";
import { ProductGalleryService } from "../services/product-gallery.service";

const router = express.Router();

const productGalleryController = new ProductGalleryController(new ProductGalleryService());

router.post('/product-gallery/create', productGalleryController.createProductGallery.bind(productGalleryController));
router.put('/product-gallery/update/:id', productGalleryController.updateProductGallery.bind(productGalleryController));
router.delete('/product-gallery/delete/:id', productGalleryController.deleteProductGallery.bind(productGalleryController));

export default router;
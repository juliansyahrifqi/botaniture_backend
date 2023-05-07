import express from "express";
import { PromoController } from "../controllers/PromoController";
import { PromoService } from "../services/promo.service";

const router = express.Router();

const promoController = new PromoController(new PromoService());

router.get('/promo', promoController.getAllPromo.bind(promoController));
router.post('/promo/create', promoController.createPromo.bind(promoController));
router.put('/promo/update/:id', promoController.updateService.bind(promoController));
router.delete('/promo/delete/:id', promoController.deletePromo.bind(promoController));
router.post('/promo/product/create/:id', promoController.createProductPromo.bind(promoController));
router.get('/promo/product', promoController.getProductPromo.bind(promoController));
router.get('/promo/product/:id', promoController.getProductPromoById.bind(promoController));


export default router;
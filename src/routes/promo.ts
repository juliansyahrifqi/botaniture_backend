import express from "express";
import { PromoController } from "../controllers/PromoController";
import { PromoService } from "../services/promo.service";
import { authenticateJWT } from "../middlewares/jwtMiddleware";

const router = express.Router();

const promoController = new PromoController(new PromoService());

router.get('/promo', promoController.getAllPromo.bind(promoController));
router.post('/promo/create', authenticateJWT, promoController.createPromo.bind(promoController));
router.put('/promo/update/:id', authenticateJWT, promoController.updateService.bind(promoController));
router.delete('/promo/delete/:id', authenticateJWT, promoController.deletePromo.bind(promoController));
router.post('/promo/product/create/:id', authenticateJWT, promoController.createProductPromo.bind(promoController));
router.get('/promo/product', promoController.getProductPromo.bind(promoController));
router.get('/promo/product/:id', promoController.getProductPromoById.bind(promoController));


export default router;
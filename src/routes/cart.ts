import express from "express";
import { CityController } from "../controllers/CityController";
import { CityService } from "../services/city.service";
import { CartController } from "../controllers/CartController";
import { CartService } from "../services/cart.service";

const router = express.Router();

const cartController = new CartController(new CartService());

router.get('/cart/:id', cartController.getCartUser.bind(cartController));
router.post('/cart/createOrUpdate', cartController.createOrUpdateCart.bind(cartController));
router.delete('/cart/delete/:id', cartController.deleteCart.bind(cartController));

export default router;
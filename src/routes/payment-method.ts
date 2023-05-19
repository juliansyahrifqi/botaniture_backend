import express from "express";
import { PaymentMethodController } from "../controllers/PaymentMethodController";
import { PaymentMethodService } from "../services/payment-method.service";
import { authenticateJWT } from "../middlewares/jwtMiddleware";

const router = express.Router();

const paymentMethodController = new PaymentMethodController(new PaymentMethodService());

router.get('/payment-method', paymentMethodController.getAllPaymentMethod.bind(paymentMethodController));
router.post('/payment-method/create', authenticateJWT, paymentMethodController.createPaymentMethod.bind(paymentMethodController));
router.put('/payment-method/update/:id', authenticateJWT, paymentMethodController.updatePaymentMethod.bind(paymentMethodController));
router.delete('/payment-method/delete/:id', authenticateJWT, paymentMethodController.deletePaymentMethod.bind(paymentMethodController));

export default router;
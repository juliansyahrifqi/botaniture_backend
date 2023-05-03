import express from "express";
import { PaymentMethodController } from "../controllers/PaymentMethodController";
import { PaymentMethodService } from "../services/payment-method.service";

const router = express.Router();

const paymentMethodController = new PaymentMethodController(new PaymentMethodService());

router.get('/payment-method', paymentMethodController.getAllPaymentMethod.bind(paymentMethodController));
router.post('/payment-method/create', paymentMethodController.createPaymentMethod.bind(paymentMethodController));
router.put('/payment-method/update/:id', paymentMethodController.updatePaymentMethod.bind(paymentMethodController));
router.delete('/payment-method/delete/:id', paymentMethodController.deletePaymentMethod.bind(paymentMethodController));

export default router;
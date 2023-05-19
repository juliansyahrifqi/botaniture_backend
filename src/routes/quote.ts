import express from "express";
import { QuoteController } from "../controllers/QuoteController";
import { QuoteService } from "../services/quote.service";
import { authenticateJWT } from "../middlewares/jwtMiddleware";

const router = express.Router();

const quoteController = new QuoteController(new QuoteService());

router.get('/quote', quoteController.getQuote.bind(quoteController));
router.put('/quote/update/:id', authenticateJWT, quoteController.updateQuote.bind(quoteController));

export default router;
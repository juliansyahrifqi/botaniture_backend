import express from "express";
import { QuoteController } from "../controllers/QuoteController";
import { QuoteService } from "../services/quote.service";

const router = express.Router();

const quoteController = new QuoteController(new QuoteService());

router.get('/quote', quoteController.getQuote.bind(quoteController));
router.put('/quote/update/:id', quoteController.updateQuote.bind(quoteController));

export default router;
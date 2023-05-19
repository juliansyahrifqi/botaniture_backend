import express from "express";
import { ContactController } from "../controllers/ContactController";
import { ContactService } from "../services/contact.service";
import { authenticateJWT } from "../middlewares/jwtMiddleware";

const router = express.Router();

const contactController = new ContactController(new ContactService());

router.get('/contact', contactController.getAllContact.bind(contactController));
router.post('/contact/create', authenticateJWT, contactController.createContact.bind(contactController));
router.put('/contact/update/:id', authenticateJWT, contactController.updateContact.bind(contactController));
router.delete('/contact/delete/:id', authenticateJWT, contactController.deleteContact.bind(contactController));

export default router;
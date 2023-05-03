import express from "express";
import { ContactController } from "../controllers/ContactController";
import { ContactService } from "../services/contact.service";

const router = express.Router();

const contactController = new ContactController(new ContactService());

router.get('/contact', contactController.getAllContact.bind(contactController));
router.post('/contact/create', contactController.createContact.bind(contactController));
router.put('/contact/update/:id', contactController.updateContact.bind(contactController));
router.delete('/contact/delete/:id', contactController.deleteContact.bind(contactController));

export default router;
import express from "express";
import { ServiceController } from "../controllers/ServiceController";
import { LayananService } from "../services/Service";

const router = express.Router();

const serviceController = new ServiceController(new LayananService());

router.get('/services', serviceController.getAllServices.bind(serviceController));
router.post('/services/create', serviceController.createService.bind(serviceController));
router.put('/services/update/:id', serviceController.updateService.bind(serviceController));
router.delete('/services/delete/:id', serviceController.deleteService.bind(serviceController));

export default router;
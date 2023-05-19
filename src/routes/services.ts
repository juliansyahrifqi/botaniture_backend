import express from "express";
import { ServiceController } from "../controllers/ServiceController";
import { LayananService } from "../services/service.service";
import { authenticateJWT } from "../middlewares/jwtMiddleware";

const router = express.Router();

const serviceController = new ServiceController(new LayananService());

router.get('/services', serviceController.getAllServices.bind(serviceController));
router.post('/services/create', authenticateJWT, serviceController.createService.bind(serviceController));
router.put('/services/update/:id', authenticateJWT, serviceController.updateService.bind(serviceController));
router.delete('/services/delete/:id', authenticateJWT, serviceController.deleteService.bind(serviceController));

export default router;
import express from "express";
import { ProvinceController } from "../controllers/ProvinceController";
import { ProvinceService } from "../services/province.service";

const router = express.Router();

const provinceController = new ProvinceController(new ProvinceService());

router.get('/provinces', provinceController.getAllProvinces.bind(provinceController));
router.get('/provinces/:id', provinceController.getProvinceById.bind(provinceController));

export default router;
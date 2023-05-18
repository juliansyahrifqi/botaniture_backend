import express from "express";
import { CityController } from "../controllers/CityController";
import { CityService } from "../services/city.service";

const router = express.Router();

const cityController = new CityController(new CityService());

router.get('/city', cityController.getAllCity.bind(cityController));
router.get('/city/:id', cityController.getCityByProvince.bind(cityController));

export default router;
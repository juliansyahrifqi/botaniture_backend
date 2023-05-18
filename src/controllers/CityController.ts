import { Request, Response } from "express";
import { CityService } from "../services/city.service";

export class CityController {
  private cityService: CityService;

  constructor(cityService: CityService) {
    this.cityService = cityService;
  }

  public async getAllCity(req: Request, res: Response) {
    try {
      const cities = await this.cityService.getAllCity();

      res.send(cities);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e});
    }
  }

  public async getCityByProvince(req: Request, res: Response) {
    try {
      const city = await this.cityService.getCityByProvince(+req.params.id);

      res.send(city);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e});
    }
  }
}
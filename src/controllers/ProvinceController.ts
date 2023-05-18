import { Request, Response } from "express";
import { ProvinceService } from "../services/province.service";

export class ProvinceController {
  private provinceService: ProvinceService;

  constructor(provinceService: ProvinceService) {
    this.provinceService = provinceService;
  }

  public async getAllProvinces(req: Request, res: Response) {
    try {
      const provinces = await this.provinceService.getAllProvince();

      res.send(provinces);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e});
    }
  }

  public async getProvinceById(req: Request, res: Response) {
    try {
      const province = await this.provinceService.getProvinceById(+req.params.id);

      res.send(province);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e});
    }
  }
}
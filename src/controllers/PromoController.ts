import { Request, Response } from "express";
import { PromoService } from "../services/promo.service";
import { CreatePromoDTO, UpdatePromoDTO } from "../dto/promo.dto";

export class PromoController {
  private promoService: PromoService;

  constructor(promoService: PromoService) {
    this.promoService = promoService;
  }

  public async getAllPromo(req: Request, res: Response) {
    try {
      const promo = await this.promoService.getAllPromo();
      res.send(promo);
    } catch(e) {
      res.status(500).send({ statusCode: 500, message: e})
    }
  }

  public async createPromo(req: Request, res: Response) {
    try {
      const createPromoDTO: CreatePromoDTO = req.body;

      const promo = await this.promoService.createPromo(createPromoDTO);

      res.send(promo);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e})
    }
  }

  public async updateService(req: Request, res: Response) {
    try {
      const promo = await this.promoService.getPromoById(+req.params.id);

      if(promo.statusCode === 404) {
        return res.status(404).send(promo);
      }

      const updatePromoDTO: UpdatePromoDTO = req.body;

      const result = await this.promoService.updatePromo(+req.params.id, updatePromoDTO);

      res.send(result);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e})
    }
  }

  public async deletePromo(req: Request, res: Response) {
    try {
      const promo = await this.promoService.getPromoById(+req.params.id);

      if(promo.statusCode === 404) {
        return res.status(404).send(promo);
      } 

      const result = await this.promoService.deletePromo(+req.params.id);

      res.send(result);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e})
    }
  }

  public async createProductPromo(req: Request, res: Response) {
    try {
      const result = await this.promoService.createProductPromo(+req.params.id, req.body.product_id)

      res.send(result);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e})
    }
  }

  public async getProductPromo(req: Request, res: Response) {
    try {
      const result = await this.promoService.getPromoWithProduct();

      res.send(result);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e})
    }
  }

  public async getProductPromoById(req: Request, res: Response) {
    try {
      const result = await this.promoService.getPromoWithProductById(+req.params.id);

      res.send(result);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e})
    }
  }
}
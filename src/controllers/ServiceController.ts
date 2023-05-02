import { Request, Response } from "express";
import { LayananService } from "../services/Service";
import { CreateServiceDTO, UpdateServiceDTO } from "../dto/service.dto";

export class ServiceController {
  private layananSerive: LayananService;

  constructor(layananService: LayananService) {
    this.layananSerive = layananService;
  }

  public async getAllServices(req: Request, res: Response) {
    try {
      const users = await this.layananSerive.getAllServices();
      res.send(users);
    } catch(e) {
      res.status(500).send({ statusCode: 500, message: e})
    }
  }

  public async createService(req: Request, res: Response) {
    try {
      const createServiceDTO: CreateServiceDTO = req.body;

      const service = await this.layananSerive.createService(createServiceDTO);

      res.send(service);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e})
    }
  }

  public async updateService(req: Request, res: Response) {
    try {
      const updateServiceDto: UpdateServiceDTO = req.body;

      const service = await this.layananSerive.updateService(+req.params.id, updateServiceDto);

      res.send(service);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e})
    }
  }

  public async deleteService(req: Request, res: Response) {
    try {
      const service = await this.layananSerive.deleteService(+req.params.id);

      res.send(service);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e})
    }
  }
}
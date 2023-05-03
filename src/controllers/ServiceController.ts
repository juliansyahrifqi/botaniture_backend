import { Request, Response } from "express";
import { LayananService } from "../services/Service";
import { CreateServiceDTO, UpdateServiceDTO } from "../dto/service.dto";
import multer from "multer";
import { existsSync, unlink } from "fs";
import uploadSingleFile from "../utils/uploadFile";

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
    const upload = uploadSingleFile("service", "service_icon");

    upload(req, res, async(err) => {
      if (err) {
        return res.status(400).json({ message: "File upload failed", error: err });
      }
      
      try {
        const createServiceDTO: CreateServiceDTO = req.body;

        const service = await this.layananSerive.createService({
          ...createServiceDTO,
          service_icon: req.file ? req.file.filename : null
        });
  
        res.send(service);
      } catch (e) {
        res.status(500).send({ statusCode: 500, message: e})
      }
    })
  }

  public async updateService(req: Request, res: Response) {
    const upload = uploadSingleFile("service", "service_icon");

    upload(req, res, async(err) => {
      if (err) {
        return res.status(400).json({ message: "File upload failed", error: err });
      }

      try {
        const service = await this.layananSerive.getServiceById(+req.params.id);

        const oldImage = service.data.service_icon;

        console.log(oldImage);
        
        let finalImage: string;

        if(req.file) {
          if (existsSync('uploads/service/' + oldImage)) {
            unlink('uploads/service/' + oldImage, (err) => {
              if (err) throw err;
            });
          }

          finalImage = req.file.filename;
        } else {
          finalImage = oldImage;
        }

        const updateServiceDto: UpdateServiceDTO = req.body;
  
        const result = await this.layananSerive.updateService(+req.params.id, {
          ...updateServiceDto,
          service_icon: finalImage
        });
  
        res.send(result);
      } catch (e) {
        res.status(500).send({ statusCode: 500, message: e})
      }
    })
  }

  public async deleteService(req: Request, res: Response) {
    try {
      const service = await this.layananSerive.getServiceById(+req.params.id);

      if(service.statusCode === 404) {
        return { statusCode: 404, message: 'Service not found'};
      } 

      if (existsSync('uploads/service/' + service.data.service_icon)) {
        unlink('uploads/service/' + service.data.service_icon, (err) => {
          if (err) throw err;
        });
      }

      const result = await this.layananSerive.deleteService(+req.params.id);

      res.send(result);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e})
    }
  }
}
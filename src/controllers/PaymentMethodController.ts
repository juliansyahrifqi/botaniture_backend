import { Request, Response } from "express";
import { uploadSingleFile } from "../utils/uploadFile";
import { existsSync, unlink } from "fs";
import { PaymentMethodService } from "../services/payment-method.service";
import { CreatePaymentMethodDTO, UpdatePaymentMethodDTO } from "../dto/payment-method.dto";

export class PaymentMethodController {
  private paymentMethodService: PaymentMethodService;

  constructor(paymentMethodService: PaymentMethodService) {
    this.paymentMethodService = paymentMethodService;
  }

  public async getAllPaymentMethod(req: Request, res: Response) {
    try {
      const paymentMethod = await this.paymentMethodService.getAllPaymentMethod();

      res.send(paymentMethod);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e});
    }
  }

  public async createPaymentMethod(req: Request, res: Response) {
    const upload = uploadSingleFile("payment_method", "payment_image");

    upload(req, res, async(err) => {
      if (err) {
        return res.status(400).json({ message: "File upload failed", error: err });
      }
      
      try {
        const createPaymentMethodDTO: CreatePaymentMethodDTO = req.body;

        const paymentMethod = await this.paymentMethodService.createPaymentMethod({
          ...createPaymentMethodDTO,
          payment_image: req.file ? req.file.filename : null
        });
  
        res.send(paymentMethod);
      } catch (e) {
        res.status(500).send({ statusCode: 500, message: e})
      }
    })
  }

  public async updatePaymentMethod(req: Request, res: Response) {
    const upload = uploadSingleFile("payment_method", "payment_image");

    upload(req, res, async(err) => {
      if (err) {
        return res.status(400).json({ message: "File upload failed", error: err });
      }

      try {
        const paymentMethod = await this.paymentMethodService.getPaymentMethodById(+req.params.id);

        const oldImage = paymentMethod.data.payment_image;
 
        let finalImage: string;

        if(req.file) {
          if (existsSync('uploads/payment_method/' + oldImage)) {
            unlink('uploads/payment_method/' + oldImage, (err) => {
              if (err) throw err;
            });
          }

          finalImage = req.file.filename;
        } else {
          finalImage = oldImage;
        }

        const updatePaymentMethodDTO: UpdatePaymentMethodDTO = req.body;
  
        const result = await this.paymentMethodService.updatePaymentMethod(+req.params.id, {
          ...updatePaymentMethodDTO,
          payment_image: finalImage
        });
  
        res.send(result);
      } catch (e) {
        res.status(500).send({ statusCode: 500, message: e})
      }
    })
  }

  public async deletePaymentMethod(req: Request, res: Response) {
    try {
      const paymentMethod = await this.paymentMethodService.getPaymentMethodById(+req.params.id);

      if(paymentMethod.statusCode === 404) {
        return { statusCode: 404, message: 'Payment Method not found'};
      } 

      if (existsSync('uploads/payment_method/' + paymentMethod.data.payment_image)) {
        unlink('uploads/payment_method/' + paymentMethod.data.payment_image, (err) => {
          if (err) throw err;
        });
      }

      const result = await this.paymentMethodService.deletePaymentMethod(+req.params.id);

      res.send(result);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e})
    }
  }
}
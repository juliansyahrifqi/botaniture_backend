import { Request, Response } from "express";
import { uploadMultipleFiles, uploadSingleFile } from "../utils/uploadFile";
import { existsSync, unlink } from "fs";
import { ProductGalleryService } from "../services/product-gallery.service";
import { CreateProductGalleryDTO, UpdateProductGalleryDTO } from "../dto/product-gallery.dto";

export class ProductGalleryController {
  private productGalleryService: ProductGalleryService;

  constructor(productGalleryService: ProductGalleryService) {
    this.productGalleryService = productGalleryService;
  }

  public async createProductGallery(req: Request, res: Response) {
    const upload = uploadMultipleFiles("product_gallery", "proga_image");

    upload(req, res, async(err) => {
      if (err) {
        return res.status(400).json({ message: "File upload failed", error: err });
      }

      try {
        const createProductGalleryDTO: CreateProductGalleryDTO = req.body;

        if(req.files.length !== 0) {
          for(let i = 0; i < +req.files.length; i++) {
            await this.productGalleryService.createProductGallery({
              ...createProductGalleryDTO,
              proga_primary: i === 0 ? true : false, // Always set first image to primary image
              proga_image: req.files[i].filename
            });
          } 
        } else {
          await this.productGalleryService.createProductGallery({
            ...createProductGalleryDTO,
            proga_primary: true,
            proga_image: null,
          });
        }
  
        return res.status(200).send({ statusCode: 200, message: 'Product Gallery Created'})
      } catch (e) {
        res.status(500).send({ statusCode: 500, message: e})
      }
    })
  }

  public async updateProductGallery(req: Request, res: Response) {
    const upload = uploadSingleFile("product_gallery", "proga_image");

    upload(req, res, async(err) => {
      if (err) {
        return res.status(400).json({ message: "File upload failed", error: err });
      }

      try {
        const productCategory = await this.productGalleryService.getProductGalleryById(+req.params.id);

        const oldImage = productCategory.data.proga_image;
 
        let finalImage: string;

        if(req.file) {
          if (existsSync('uploads/product_gallery/' + oldImage)) {
            unlink('uploads/product_gallery/' + oldImage, (err) => {
              if (err) throw err;
            });
          }

          finalImage = req.file.filename;
        } else {
          finalImage = oldImage;
        }

        const updateProductGalleryDTO: UpdateProductGalleryDTO = req.body;
  
        const result = await this.productGalleryService.updateProductGallery(+req.params.id, {
          ...updateProductGalleryDTO,
          proga_image: finalImage
        });
  
        res.send(result);
      } catch (e) {
        res.status(500).send({ statusCode: 500, message: e})
      }
    })
  }

  public async deleteProductGallery(req: Request, res: Response) {
    try {
      const productGallery = await this.productGalleryService.getProductGalleryById(+req.params.id);

      if(productGallery.statusCode === 404) {
        return { statusCode: 404, message: 'Product Gallery not found'};
      } 

      if (existsSync('uploads/product_gallery/' + productGallery.data.proga_image)) {
        unlink('uploads/product_gallery/' + productGallery.data.proga_image, (err) => {
          if (err) throw err;
        });
      }

      const result = await this.productGalleryService.deleteProductGallery(+req.params.id);

      res.send(result);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e})
    }
  }
}
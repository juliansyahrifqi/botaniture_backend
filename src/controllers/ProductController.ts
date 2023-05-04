import { Request, Response } from "express";
import uploadSingleFile from "../utils/uploadFile";
import { existsSync, unlink } from "fs";
import { ProductService } from "../services/product.service";
import { CreateProductDTO, UpdateProductDTO } from "../dto/product.dto";
import slugify from "slugify";

export class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  public async getAllProduct(req: Request, res: Response) {
    try {
      const products = await this.productService.getAllProduct();

      res.send(products);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e});
    }
  }

  public async createProduct(req: Request, res: Response) {
    const upload = uploadSingleFile("product", "product_image");

    upload(req, res, async(err) => {
      if (err) {
        return res.status(400).json({ message: "File upload failed", error: err });
      }
      
      try {
        const createProductDTO: CreateProductDTO = req.body;

        const product = await this.productService.createProduct({
          ...createProductDTO,
          product_slug: slugify(createProductDTO.product_name, {
            lower: true
          }),
          createdAt: new Date(),
          updatedAt: null,
          product_image: req.file ? req.file.filename : null
        });
  
        res.send(product);
      } catch (e) {
        res.status(500).send({ statusCode: 500, message: e})
      }
    })
  }

  public async updateProduct(req: Request, res: Response) {
    const upload = uploadSingleFile("product", "product_image");

    upload(req, res, async(err) => {
      if (err) {
        return res.status(400).json({ message: "File upload failed", error: err });
      }

      try {
        const product = await this.productService.getProductById(+req.params.id);

        const oldImage = product.data.product_image;
 
        let finalImage: string;

        if(req.file) {
          if (existsSync('uploads/product/' + oldImage)) {
            unlink('uploads/product/' + oldImage, (err) => {
              if (err) throw err;
            });
          }

          finalImage = req.file.filename;
        } else {
          finalImage = oldImage;
        }

        const updateProductDTO: UpdateProductDTO = req.body;
  
        const result = await this.productService.updateProduct(+req.params.id, {
          ...updateProductDTO,
          product_slug: slugify(updateProductDTO.product_name, {
            lower: true
          }),
          createdAt: product.data.createdAt,
          updatedAt: new Date(),
          product_image: finalImage
        });
  
        res.send(result);
      } catch (e) {
        res.status(500).send({ statusCode: 500, message: e})
      }
    })
  }

  public async deleteContact(req: Request, res: Response) {
    try {
      const product = await this.productService.getProductById(+req.params.id);

      if(product.statusCode === 404) {
        return { statusCode: 404, message: 'Product not found'};
      } 

      if (existsSync('uploads/contact/' + product.data.product_image)) {
        unlink('uploads/contact/' + product.data.product_image, (err) => {
          if (err) throw err;
        });
      }

      const result = await this.productService.deleteProduct(+req.params.id);

      res.send(result);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e})
    }
  }
}
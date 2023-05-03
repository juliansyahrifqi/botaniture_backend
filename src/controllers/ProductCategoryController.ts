import { Request, Response } from "express";
import uploadSingleFile from "../utils/uploadFile";
import { existsSync, unlink } from "fs";
import { ProductCategoryService } from "../services/product-category.service";
import { CreateProductCategoryDTO, UpdateProductCategoryDTO } from "../dto/product-category.dto";

export class ProductCategoryController {
  private productCategoryService: ProductCategoryService;

  constructor(productCategoryService: ProductCategoryService) {
    this.productCategoryService = productCategoryService;
  }

  public async getAllProductCategory(req: Request, res: Response) {
    try {
      const productCategory = await this.productCategoryService.getAllProductCategory();

      res.send(productCategory);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e});
    }
  }

  public async createProductCategory(req: Request, res: Response) {
    const upload = uploadSingleFile("product_category", "procat_image");

    upload(req, res, async(err) => {
      if (err) {
        return res.status(400).json({ message: "File upload failed", error: err });
      }
      
      try {
        const createProductCategoryDTO: CreateProductCategoryDTO = req.body;

        const productCategory = await this.productCategoryService.createProductCategory({
          ...createProductCategoryDTO,
          procat_image: req.file ? req.file.filename : null
        });
  
        res.send(productCategory);
      } catch (e) {
        res.status(500).send({ statusCode: 500, message: e})
      }
    })
  }

  public async updateProductCategory(req: Request, res: Response) {
    const upload = uploadSingleFile("product_category", "procat_image");

    upload(req, res, async(err) => {
      if (err) {
        return res.status(400).json({ message: "File upload failed", error: err });
      }

      try {
        const productCategory = await this.productCategoryService.getProductCategoryById(+req.params.id);

        const oldImage = productCategory.data.procat_image;
 
        let finalImage: string;

        if(req.file) {
          if (existsSync('uploads/product_category/' + oldImage)) {
            unlink('uploads/product_category/' + oldImage, (err) => {
              if (err) throw err;
            });
          }

          finalImage = req.file.filename;
        } else {
          finalImage = oldImage;
        }

        const updateProductCategoryDTO: UpdateProductCategoryDTO = req.body;
  
        const result = await this.productCategoryService.updateProductCategory(+req.params.id, {
          ...updateProductCategoryDTO,
          procat_image: finalImage
        });
  
        res.send(result);
      } catch (e) {
        res.status(500).send({ statusCode: 500, message: e})
      }
    })
  }

  public async deleteProductCategory(req: Request, res: Response) {
    try {
      const productCategory = await this.productCategoryService.getProductCategoryById(+req.params.id);

      if(productCategory.statusCode === 404) {
        return { statusCode: 404, message: 'Product Category not found'};
      } 

      if (existsSync('uploads/product_category/' + productCategory.data.procat_image)) {
        unlink('uploads/product_category/' + productCategory.data.procat_image, (err) => {
          if (err) throw err;
        });
      }

      const result = await this.productCategoryService.deleteProductCategory(+req.params.id);

      res.send(result);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e})
    }
  }
}
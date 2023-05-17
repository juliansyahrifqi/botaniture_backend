import { create } from "domain";
import { myDataSource } from "../app-data-source";
import { CreateProductDTO, UpdateProductDTO } from "../dto/product.dto";
import { Product } from "../entities/Product";
import { ProductCategory } from "../entities/ProductCategory";

export class ProductService {
  private readonly productRepository = myDataSource.getRepository(Product);
  private readonly productCategoryRepository = myDataSource.getRepository(ProductCategory);

  async getAllProduct() {
    try {
      const products = await this.productRepository.find({
        relations: ['productCategory', 'productGalleries'],
        order: {
          product_id: "ASC"
        }
      });

      if(products.length === 0) {
        return { statusCode: 404, message: 'Products Not Found'}
      } 

      return { statusCode: 200, message: 'Products Found', data: products};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async getProductById(id: number) {
    try {
      const product = await this.productRepository.findOne({
        relations: ['productCategory', 'productGalleries'],
        where: {
          product_id: id
        }
      });

      if(!product) {
        return { statusCode: 404, message: 'Product Not Found'}
      }

      return { statusCode: 200, message: 'Product Found', data: product};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async getProductBySlug(slug: string) {
    try {
      const product = await this.productRepository.findOne({
        relations: ['productCategory', 'productGalleries'],
        where: {
          product_slug: slug
        }
      });

      if(!product) {
        return { statusCode: 404, message: 'Product Not Found'}
      }

      return { statusCode: 200, message: 'Product Found', data: product};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async createProduct(createProductDTO: CreateProductDTO) {
    try {
      const productCategory = await this.productCategoryRepository.findOneBy({ procat_id: createProductDTO.product_category_id});

      if(!productCategory) {
        return { statusCode: 404, message: 'Product Category Not Found'};
      }

      const product = {
        ...createProductDTO,
        productCategory: productCategory
      }

      await this.productRepository.save(product);

      return { statusCode: 200, message: 'Product Created'};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async updateProduct(id: number, updateProductDTO: UpdateProductDTO) {
    try {
      const product = await this.productRepository.findOneBy({ product_id: id });

      if(!product) {
        return { statusCode: 404, message: 'Product Not Found'};    
      }

      this.productRepository.merge(product, updateProductDTO);

      await this.productRepository.save(product);

      return { statusCode: 200, message: 'Product Updated'};   
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async deleteProduct(id: number) {
    try {
      const product = await this.productRepository.findOneBy({ product_id: id });

      if(!product) {
        return { statusCode: 404, message: 'Product Not Found'};    
      }

      await this.productRepository.delete(id);

      return { statusCode: 200, message: 'Product Deleted'};    
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }
}
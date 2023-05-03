import { myDataSource } from "../app-data-source";
import { CreateProductCategoryDTO, UpdateProductCategoryDTO } from "../dto/product-category.dto";
import { ProductCategory } from "../entities/ProductCategory";


export class ProductCategoryService {
  private readonly productCategoryRepository = myDataSource.getRepository(ProductCategory);

  async getAllProductCategory() {
    try {
      const productCategory = await this.productCategoryRepository.find();

      if(productCategory.length === 0) {
        return { statusCode: 404, message: 'Product Category Not Found'}
      } 

      return { statusCode: 200, message: 'Product Category Found', data: productCategory};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async getProductCategoryById(id: number) {
    try {
      const productCategory = await this.productCategoryRepository.findOneBy({ procat_id: id});

      if(!productCategory) {
        return { statusCode: 404, message: 'Product Category Not Found'}
      }

      return { statusCode: 200, message: 'Product Category Found', data: productCategory};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async createProductCategory(createProductCategoryDTO: CreateProductCategoryDTO) {
    try {
      await this.productCategoryRepository.save(createProductCategoryDTO);

      return { statusCode: 200, message: 'Product Category Created'};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async updateProductCategory(id: number, updateProductCategoryDTO: UpdateProductCategoryDTO) {
    try {
      const productCategory = await this.productCategoryRepository.findOneBy({ procat_id: id });

      if(!productCategory) {
        return { statusCode: 404, message: 'Product Category Not Found'};    
      }

      this.productCategoryRepository.merge(productCategory, updateProductCategoryDTO);

      await this.productCategoryRepository.save(productCategory);

      return { statusCode: 200, message: 'Product Category Updated'};   
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async deleteProductCategory(id: number) {
    try {
      const productCategory = await this.productCategoryRepository.findOneBy({ procat_id: id });

      if(!productCategory) {
        return { statusCode: 404, message: 'Product Category Not Found'};    
      }

      await this.productCategoryRepository.delete(id);

      return { statusCode: 200, message: 'Product Category Deleted'};    
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }
}
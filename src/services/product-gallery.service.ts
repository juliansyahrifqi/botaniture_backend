import { myDataSource } from "../app-data-source";
import { CreateProductGalleryDTO, UpdateProductGalleryDTO } from "../dto/product-gallery.dto";
import { ProductGallery } from "../entities/ProductGallery";


export class ProductGalleryService {
  private readonly productGalleryRepository = myDataSource.getRepository(ProductGallery);

  async getProductGalleryById(id: number) {
    try {
      const productGallery = await this.productGalleryRepository.findOneBy({ proga_id: id});

      if(!productGallery) {
        return { statusCode: 404, message: 'Product Gallery Not Found'}
      }

      return { statusCode: 200, message: 'Product Gallery Found', data: productGallery};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async createProductGallery(createProductGalleryDTO: CreateProductGalleryDTO) {
    try {
      await this.productGalleryRepository.save(createProductGalleryDTO);

      return { statusCode: 200, message: 'Product Gallery Created'};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async updateProductGallery(id: number, updateProductGalleryDTO: UpdateProductGalleryDTO) {
    try {
      const productGallery = await this.productGalleryRepository.findOneBy({ proga_id: id });

      if(!productGallery) {
        return { statusCode: 404, message: 'Product Gallery Not Found'};    
      }

      this.productGalleryRepository.merge(productGallery, updateProductGalleryDTO);

      await this.productGalleryRepository.save(productGallery);

      return { statusCode: 200, message: 'Product Gallery Updated'};   
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async deleteProductGallery(id: number) {
    try {
      const productGallery = await this.productGalleryRepository.findOneBy({ proga_id: id });

      if(!productGallery) {
        return { statusCode: 404, message: 'Product Gallery Not Found'};    
      }

      await this.productGalleryRepository.delete(id);

      return { statusCode: 200, message: 'Product Gallery Deleted'};    
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }
}
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { myDataSource } from "../app-data-source";
import { CreatePromoDTO, UpdatePromoDTO } from "../dto/promo.dto";
import { Product } from "../entities/Product";
import { Promo } from "../entities/Promo";

export class PromoService {
  private readonly promoRepository = myDataSource.getRepository(Promo);
  private readonly productRepository = myDataSource.getRepository(Product);

  async getPromoById(id: number) {
    try {
      const promo = await this.promoRepository.findOneBy({ promo_id: id});

      if(!promo) {
        return { statusCode: 404, message: 'Promo Not Found'}
      }

      return { statusCode: 200, message: 'Promo Found', data: promo};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async getAllPromo() {
    try {
      const promo = await this.promoRepository.find({
        order: {
          promo_id: "DESC"
        },
        take: 4
      });

      if(promo.length === 0) {
        return { statusCode: 404, message: 'Promo Not Found'}
      } 

      return { statusCode: 200, message: 'Promo Found', data: promo};
    }catch(e) {
      return { statusCode: 500, message: e}
    }
  }

  async getPromoWithProduct() {
    try {
      const promoProduct = await this.promoRepository.find({
        relations: {
          products: true
        },
        order: {
          promo_id: "DESC"
        },
        where: {
          promo_end_date: MoreThanOrEqual(new Date())
        },
        take: 1
      })

      if(promoProduct.length === 0) {
        return { statusCode: 404, message: 'Promo Not Found'} 
      }

      return { statusCode: 200, message: "Promo found", data: promoProduct[0] }
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async getPromoWithProductById(id: number) {
    try {
      const promoProduct = await this.promoRepository.find({
        relations: {
          products: true
        },
        order: {
          promo_id: "DESC"
        },
        where: {
          promo_id: id
        }
      })

      if(promoProduct.length === 0) {
        return { statusCode: 404, message: 'Promo Not Found'} 
      }

      return { statusCode: 200, message: "Promo found", data: promoProduct }
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async createPromo(createPromoDTO: CreatePromoDTO) {
    try {
      await this.promoRepository.save(createPromoDTO);

      return { statusCode: 200, message: 'Promo Created'};     
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async createProductPromo(promo_id: number, product_ids: number[]) {
    try {
      const promo = await this.promoRepository.findOneBy({ promo_id: promo_id });

      if(!promo) {
        return { statusCode: 404, message: 'Promo Not Found'} 
      }

      const products = await this.productRepository.createQueryBuilder("product")
            .where("product.product_id IN (:...product_ids)", { product_ids })
            .getMany();

      if (products.length !== product_ids.length) {
          return { statusCode: 400, message: "One or more products not found" };
      }
      
      if (!promo.products) {
        promo.products = [];
      }
     
      promo.products = [...promo.products, ...products];
      await this.promoRepository.save(promo);

      return { statusCode: 200, message: "Product added to promo"};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async updatePromo(id: number, updatePromoDTO: UpdatePromoDTO) {
    try {
      const promo = await this.promoRepository.findOneBy({ promo_id: id });

      if(!promo) {
        return { statusCode: 404, message: 'Promo Not Found'};    
      }

      this.promoRepository.merge(promo, updatePromoDTO);

      await this.promoRepository.save(promo);

      return { statusCode: 200, message: 'Promo Updated'};     
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async deletePromo(id: number) {
    try {
      const promo = await this.promoRepository.findOneBy({ promo_id: id });

      if(!promo) {
        return { statusCode: 404, message: 'Promo Not Found'};    
      }

      await this.promoRepository.delete(id);

      return { statusCode: 200, message: 'Promo Deleted'};    
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }
}
import { myDataSource } from "../app-data-source";
import { CreateCartDTO } from "../dto/cart.dto";
import { Cart } from "../entities/Cart";
import { Product } from "../entities/Product";
import { User } from "../entities/User";

export class CartService {
  private readonly cartRepository = myDataSource.getRepository(Cart);
  private readonly userRepository = myDataSource.getRepository(User);
  private readonly productRepository = myDataSource.getRepository(Product);

  async getCartUser(id: number) {
    try {
      const cart = await this.cartRepository.find({
        where: {
          user: {
            user_id: id
          }
        },
        relations: {
          product: true
        }
      });

      if(!cart || cart.length === 0) {
        return { statusCode: 404, message: 'Cart Not Found'}
      }

      return { statusCode: 200, message: 'Cart Found', data: cart};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async addOrUpdateCart(createCartDTO: CreateCartDTO) {
    try {
      const user = await this.userRepository.findOneBy({ user_id: createCartDTO.cart_user_id});

      if(!user) {
        return { statusCode: 404, message: 'User Not Found'}
      }

      const product = await this.productRepository.findOneBy({ product_id: createCartDTO.cart_product_id});

      if(!product) {
        return { statusCode: 404, message: 'Product Not Found'}
      }

      const cart = await this.cartRepository.findOne({
        where: {
          user: {
            user_id: createCartDTO.cart_user_id
          },
          product: {
            product_id: createCartDTO.cart_product_id
          }
        }
      });

      if(!cart) {
        const cartData = {
          ...createCartDTO,
          product: product,
          user: user
        }

        await this.cartRepository.save(cartData);

        return { statusCode: 200, message: 'Cart Success Add'}
      }

      this.cartRepository.merge(cart, createCartDTO);

      await this.cartRepository.save(cart);

      return { statusCode: 200, message: 'Cart Updated'};   
    } catch (error) {
      return { statusCode: 500, message: error}
    }
  }

  async deleteCart(id: number) {
    try {
      const cart = await this.cartRepository.findOneBy({ cart_id: id });

      if(!cart) {
        return { statusCode: 404, message: 'Cart Not Found'};    
      }

      await this.cartRepository.delete(id);

      return { statusCode: 200, message: 'Cart Deleted'};    
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }
}
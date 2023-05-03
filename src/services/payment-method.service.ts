import { myDataSource } from "../app-data-source";
import { CreatePaymentMethodDTO, UpdatePaymentMethodDTO } from "../dto/payment-method.dto";
import { PaymentMethod } from "../entities/PaymentMethod";


export class PaymentMethodService {
  private readonly paymentMethodRepository = myDataSource.getRepository(PaymentMethod);

  async getAllPaymentMethod() {
    try {
      const paymentMethod = await this.paymentMethodRepository.find();

      if(paymentMethod.length === 0) {
        return { statusCode: 404, message: 'Payment Method Not Found'}
      } 

      return { statusCode: 200, message: 'Payment Method Found', data: paymentMethod};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async getPaymentMethodById(id: number) {
    try {
      const paymentMethod = await this.paymentMethodRepository.findOneBy({ payment_id: id});

      if(!paymentMethod) {
        return { statusCode: 404, message: 'Payment Method Not Found'}
      }

      return { statusCode: 200, message: 'Payment Method Found', data: paymentMethod};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async createPaymentMethod(createPaymentMethodDTO: CreatePaymentMethodDTO) {
    try {
      await this.paymentMethodRepository.save(createPaymentMethodDTO);

      return { statusCode: 200, message: 'Payment Method Created'};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async updatePaymentMethod(id: number, updatePaymentMethodDTO: UpdatePaymentMethodDTO) {
    try {
      const paymentMethod = await this.paymentMethodRepository.findOneBy({ payment_id: id });

      if(!paymentMethod) {
        return { statusCode: 404, message: 'Payment Method Not Found'};    
      }

      this.paymentMethodRepository.merge(paymentMethod, updatePaymentMethodDTO);

      await this.paymentMethodRepository.save(paymentMethod);

      return { statusCode: 200, message: 'Payment Method Updated'};   
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async deletePaymentMethod(id: number) {
    try {
      const service = await this.paymentMethodRepository.findOneBy({ payment_id: id });

      if(!service) {
        return { statusCode: 404, message: 'Payment Method Not Found'};    
      }

      await this.paymentMethodRepository.delete(id);

      return { statusCode: 200, message: 'Payment Method Deleted'};    
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }
}
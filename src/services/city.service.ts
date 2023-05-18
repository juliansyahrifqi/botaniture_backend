import { myDataSource } from "../app-data-source";
import { City } from "../entities/City";

export class CityService {
  private readonly cityRepository = myDataSource.getRepository(City);

  async getAllCity() {
    try {
      const cities = await this.cityRepository.find();

      if(cities.length === 0) {
        return { statusCode: 404, message: 'City Not Found'}
      } 

      return { statusCode: 200, message: 'City Found', data: cities};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async getCityByProvince(id: number) {
    try {
      const city = await this.cityRepository.find({
        where: {
          province: {
            prov_id: id
          }
        }
      });

      if(!city || city.length === 0) {
        return { statusCode: 404, message: 'City Not Found'}
      }

      return { statusCode: 200, message: 'City Found', data: city};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  // async createContact(createContactDTO: CreateContactDTO) {
  //   try {
  //     await this.contactRepository.save(createContactDTO);

  //     return { statusCode: 200, message: 'Contact Created'};
  //   } catch (e) {
  //     return { statusCode: 500, message: e}
  //   }
  // }

  // async updateContact(id: number, updateContactDTO: UpdateContactDTO) {
  //   try {
  //     const contact = await this.contactRepository.findOneBy({ contact_id: id });

  //     if(!contact) {
  //       return { statusCode: 404, message: 'Contact Not Found'};    
  //     }

  //     this.contactRepository.merge(contact, updateContactDTO);

  //     await this.contactRepository.save(contact);

  //     return { statusCode: 200, message: 'Contact Updated'};   
  //   } catch (e) {
  //     return { statusCode: 500, message: e}
  //   }
  // }

  // async deleteContact(id: number) {
  //   try {
  //     const service = await this.contactRepository.findOneBy({ contact_id: id });

  //     if(!service) {
  //       return { statusCode: 404, message: 'Contact Not Found'};    
  //     }

  //     await this.contactRepository.delete(id);

  //     return { statusCode: 200, message: 'Contact Deleted'};    
  //   } catch (e) {
  //     return { statusCode: 500, message: e}
  //   }
  // }
}
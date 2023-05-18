import { myDataSource } from "../app-data-source";
import { CreateContactDTO, UpdateContactDTO } from "../dto/contact.dto";
import { Contact } from "../entities/Contact";
import { Province } from "../entities/Province";

export class ProvinceService {
  private readonly provinceRepository = myDataSource.getRepository(Province);

  async getAllProvince() {
    try {
      const provinces = await this.provinceRepository.find();

      if(provinces.length === 0) {
        return { statusCode: 404, message: 'Provinces Not Found'}
      } 

      return { statusCode: 200, message: 'Provinces Found', data: provinces};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async getProvinceById(id: number) {
    try {
      const province = await this.provinceRepository.findOneBy({ prov_id: id});

      if(!province) {
        return { statusCode: 404, message: 'Province Not Found'}
      }

      return { statusCode: 200, message: 'Province Found', data: province};
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
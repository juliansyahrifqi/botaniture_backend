import { myDataSource } from "../app-data-source";
import { CreateContactDTO, updateContactDTO } from "../dto/contact.dto";
import { Contact } from "../entities/Contact";

export class ContactService {
  private readonly contactRepository = myDataSource.getRepository(Contact);

  async getAllContact() {
    try {
      const contacts = await this.contactRepository.find();

      if(contacts.length === 0) {
        return { statusCode: 404, message: 'Contact Not Found'}
      } 

      return { statusCode: 200, message: 'Contact Found', data: contacts};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async getContactById(id: number) {
    try {
      const contact = await this.contactRepository.findOneBy({ contact_id: id});

      if(!contact) {
        return { statusCode: 404, message: 'Contact Not Found'}
      }

      return { statusCode: 200, message: 'Contact Found', data: contact};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async createContact(createContactDTO: CreateContactDTO) {
    try {
      await this.contactRepository.save(createContactDTO);

      return { statusCode: 200, message: 'Contact Created'};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async updateContact(id: number, updateContactDTO: updateContactDTO) {
    try {
      const contact = await this.contactRepository.findOneBy({ contact_id: id });

      if(!contact) {
        return { statusCode: 404, message: 'Contact Not Found'};    
      }

      this.contactRepository.merge(contact, updateContactDTO);

      await this.contactRepository.save(contact);

      return { statusCode: 200, message: 'Contact Updated'};   
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async deleteContact(id: number) {
    try {
      const service = await this.contactRepository.findOneBy({ contact_id: id });

      if(!service) {
        return { statusCode: 404, message: 'Contact Not Found'};    
      }

      await this.contactRepository.delete(id);

      return { statusCode: 200, message: 'Contact Deleted'};    
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }
}
import { myDataSource } from "../app-data-source";
import { CreateServiceDTO, UpdateServiceDTO } from "../dto/service.dto";
import { Service } from "../entities/Service";

export class LayananService {
  private readonly serviceRepository = myDataSource.getRepository(Service);

  async getServiceById(id: number) {
    try {
      const service = await this.serviceRepository.findOneBy({ service_id: id});

      if(!service) {
        return { statusCode: 404, message: 'Services Not Found'}
      }

      return { statusCode: 200, message: 'Services Found', data: service};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }
  async getAllServices() {
    try {
      const services = await this.serviceRepository.find();

      if(services.length === 0) {
        return { statusCode: 404, message: 'Services Not Found'}
      } 

      return { statusCode: 200, message: 'Services Found', data: services};
    }catch(e) {
      return { statusCode: 500, message: e}
    }
  }

  async createService(createServiceDTO: CreateServiceDTO) {
    try {
      await this.serviceRepository.save(createServiceDTO);

      return { statusCode: 200, message: 'Services Created'};     
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async updateService(id: number, updateServiceDto: UpdateServiceDTO) {
    try {
      const service = await this.serviceRepository.findOneBy({ service_id: id });

      if(!service) {
        return { statusCode: 404, message: 'Service Not Found'};    
      }

      this.serviceRepository.merge(service, updateServiceDto);

      await this.serviceRepository.save(service);

      return { statusCode: 200, message: 'Services Updated'};     
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async deleteService(id: number) {
    try {
      const service = await this.serviceRepository.findOneBy({ service_id: id });

      if(!service) {
        return { statusCode: 404, message: 'Service Not Found'};    
      }

      await this.serviceRepository.delete(id);

      return { statusCode: 200, message: 'Services Deleted'};    
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }
}
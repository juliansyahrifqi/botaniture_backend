import { myDataSource } from "../app-data-source";
import { RegisterAccountDTO, UpdatePasswordDTO, UpdateProfileDTO } from "../dto/user.dto";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

export class UserService {
  private readonly userRepository = myDataSource.getRepository(User);

  async getUserProfile(id: number) {
    try {
      const user = await this.userRepository.findOne({ 
        select: {
          user_id: true,
          user_name: true,
          user_email: true,
          user_birth_date: true,
          user_gender: true,
          user_phone_number: true,
          user_photo_profile: true,
          user_role_id: true,
          createdAt: true,
          updatedAt: true,
        },
        where: {
          user_id: id
        },
      });

      if(!user) {
        return { statusCode: 404, message: 'User Not Found' };
      }

      return { statusCode: 200, message: 'User Found', data: user };
    } catch (error) {
      return { statusCode: 500, message: error };
    }
  }

  async registerAccount(registerAccountDTO: RegisterAccountDTO) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(registerAccountDTO.user_password, salt);

      await this.userRepository.save({
        ...registerAccountDTO,
        user_password: hashPassword,
        createdAt: new Date(),
        updatedAt: null
      });

      return { statusCode: 400, message: 'Account Create Success'}
    } catch (error) {
      return { statusCode: 500, message: error };
    }
  }

  async updateProfile(id: number, updateProfileDTO: UpdateProfileDTO) {
    try {
      const user = await this.userRepository.findOneBy({ user_id: id });

      if(!user) {
        return { statusCode: 404, message: 'User Not Found' };
      }

      this.userRepository.merge(user, updateProfileDTO);

      await this.userRepository.save(user);

      return { statusCode: 200, message: 'User Profile Updated'};   
    } catch (error) {
      return { statusCode: 500, message: error };
    }
  }

  async updatePassword(id: number, updatePasswordDTO: UpdatePasswordDTO) {
    try {
      const user = await this.userRepository.findOneBy({ user_id: id})

      if(!user) {
        return { statusCode: 404, message: 'User Not Found' };
      }

      const oldPassword = user.user_password;
      const isValid = await bcrypt.compare(updatePasswordDTO.user_password, oldPassword);

      if(!isValid) {
        return { statusCode: 400, message: 'Current Password is wrong' };
      }
    
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(updatePasswordDTO.new_password, salt);

      this.userRepository.merge(user, {
        ...updatePasswordDTO,
        user_password: hashPassword
      });

      await this.userRepository.save(user);

      return { statusCode: 200, message: 'Password Updated'}; 
    } catch (error) {
      console.log(error);
      return { statusCode: 500, message: error };
    }
  }
}
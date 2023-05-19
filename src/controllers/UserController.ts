import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { RegisterAccountDTO, UpdatePasswordDTO, UpdateProfileDTO } from "../dto/user.dto";
import { uploadSingleFile } from "../utils/uploadFile";
import { existsSync, unlink } from "fs";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUserProfile(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserProfile(+req.params.id);

      res.send(user);
    } catch (error) {
      res.status(500).send({ statusCode: 500, message: error });
    }
  }

  async registerAccount(req: Request, res: Response) {
    try {
      const registerAccountDTO: RegisterAccountDTO = req.body;

      const register = await this.userService.registerAccount(registerAccountDTO);

      res.send(register);
    } catch (error) {
      res.status(500).send({ statusCode: 500, message: error });
    }
  }

  async updateProfile(req: Request, res: Response) {
    const upload = uploadSingleFile("user", "user_photo_profile");

    upload(req, res, async(err) => {
      if (err) {
        return res.status(400).json({ message: "File upload failed", error: err });
      }

      try {
        const user = await this.userService.getUserProfile(+req.params.id);

        if(user.statusCode === 404) {
          return res.send(user);
        }

        const oldImage = user.data.user_photo_profile;
 
        let finalImage: string;

        if(req.file) {
          if (existsSync('uploads/user/' + oldImage)) {
            unlink('uploads/user/' + oldImage, (err) => {
              if (err) throw err;
            });
          }

          finalImage = req.file.filename;
        } else {
          finalImage = oldImage;
        }

        const updateProfileDTO: UpdateProfileDTO = req.body;
  
        const result = await this.userService.updateProfile(+req.params.id, {
          ...updateProfileDTO,
          updatedAt: new Date(),
          user_photo_profile: finalImage
        });
  
        res.send(result);
      } catch (e) {
        res.status(500).send({ statusCode: 500, message: e})
      }
    })
  }
  
  async updatePassword(req: Request, res: Response) {
    try {
      const updatePasswordDTO: UpdatePasswordDTO = req.body;

      const result = await this.userService.updatePassword(+req.params.id, updatePasswordDTO);

      res.send(result);
    } catch (error) {
      res.status(500).send({ statusCode: 500, message: error})
    }
  }
}
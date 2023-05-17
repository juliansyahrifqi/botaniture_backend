import { Request, Response } from "express";
import { ContactService } from "../services/contact.service";
import { uploadSingleFile } from "../utils/uploadFile";
import { CreateContactDTO, UpdateContactDTO } from "../dto/contact.dto";
import { existsSync, unlink } from "fs";

export class ContactController {
  private contactService: ContactService;

  constructor(contactService: ContactService) {
    this.contactService = contactService;
  }

  public async getAllContact(req: Request, res: Response) {
    try {
      const contact = await this.contactService.getAllContact();

      res.send(contact);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e});
    }
  }

  public async createContact(req: Request, res: Response) {
    const upload = uploadSingleFile("contact", "contact_image");

    upload(req, res, async(err) => {
      if (err) {
        return res.status(400).json({ message: "File upload failed", error: err });
      }
      
      try {
        const createContactDTO: CreateContactDTO = req.body;

        const contact = await this.contactService.createContact({
          ...createContactDTO,
          contact_image: req.file ? req.file.filename : null
        });
  
        res.send(contact);
      } catch (e) {
        res.status(500).send({ statusCode: 500, message: e})
      }
    })
  }

  public async updateContact(req: Request, res: Response) {
    const upload = uploadSingleFile("contact", "contact_image");

    upload(req, res, async(err) => {
      if (err) {
        return res.status(400).json({ message: "File upload failed", error: err });
      }

      try {
        const contact = await this.contactService.getContactById(+req.params.id);

        const oldImage = contact.data.contact_image;

        console.log(oldImage);
        
        let finalImage: string;

        if(req.file) {
          if (existsSync('uploads/contact/' + oldImage)) {
            unlink('uploads/contact/' + oldImage, (err) => {
              if (err) throw err;
            });
          }

          finalImage = req.file.filename;
        } else {
          finalImage = oldImage;
        }

        const updateContactDTO: UpdateContactDTO = req.body;
  
        const result = await this.contactService.updateContact(+req.params.id, {
          ...updateContactDTO,
          contact_image: finalImage
        });
  
        res.send(result);
      } catch (e) {
        res.status(500).send({ statusCode: 500, message: e})
      }
    })
  }

  public async deleteContact(req: Request, res: Response) {
    try {
      const contact = await this.contactService.getContactById(+req.params.id);

      if(contact.statusCode === 404) {
        return { statusCode: 404, message: 'Contact not found'};
      } 

      if (existsSync('uploads/contact/' + contact.data.contact_image)) {
        unlink('uploads/contact/' + contact.data.contact_image, (err) => {
          if (err) throw err;
        });
      }

      const result = await this.contactService.deleteContact(+req.params.id);

      res.send(result);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e})
    }
  }
}
import { Request, Response } from "express";
import { uploadSingleFile } from "../utils/uploadFile";
import { existsSync, unlink } from "fs";
import { QuoteService } from "../services/quote.service";
import { UpdateQuoteDTO } from "../dto/quote.dto";

export class QuoteController {
  private quoteService: QuoteService;

  constructor(quoteService: QuoteService) {
    this.quoteService = quoteService;
  }

  public async getQuote(req: Request, res: Response) {
    try {
      const quote = await this.quoteService.getQuote();

      res.send(quote);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e});
    }
  }

  public async updateQuote(req: Request, res: Response) {
    const upload = uploadSingleFile("quote", "quote_image");

    upload(req, res, async(err) => {
      if (err) {
        return res.status(400).json({ message: "File upload failed", error: err });
      }

      try {
        const quote = await this.quoteService.getQuote();

        const oldImage = quote.data.quote_image;

        let finalImage: string;

        if(req.file) {
          if (existsSync('uploads/quote/' + oldImage)) {
            unlink('uploads/quote/' + oldImage, (err) => {
              if (err) throw err;
            });
          }

          finalImage = req.file.filename;
        } else {
          finalImage = oldImage;
        }

        const updateQuoteDTO: UpdateQuoteDTO = req.body;
  
        const result = await this.quoteService.updateQuote(+req.params.id, {
          ...updateQuoteDTO,
          quote_image: finalImage
        });
  
        res.send(result);
      } catch (e) {
        res.status(500).send({ statusCode: 500, message: e})
      }
    })
  }
}
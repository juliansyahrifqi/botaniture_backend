import { myDataSource } from "../app-data-source";
import { UpdateQuoteDTO } from "../dto/quote.dto";
import { Quote } from "../entities/Quote";

export class QuoteService {
  private readonly quoteRepository = myDataSource.getRepository(Quote);

  async getQuote() {
    try {
      const quote = await this.quoteRepository.findOneBy({ quote_id: 1});

      if(!quote) {
        return { statusCode: 404, message: 'Quote Not Found'}
      } 

      return { statusCode: 200, message: 'Quote Found', data: quote};
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }

  async updateQuote(id: number, updateQuoteDTO: UpdateQuoteDTO) {
    try {
      const quote = await this.quoteRepository.findOneBy({ quote_id: id });

      if(!quote) {
        return { statusCode: 404, message: 'Quote Not Found'};    
      }

      this.quoteRepository.merge(quote, updateQuoteDTO);

      await this.quoteRepository.save(quote);

      return { statusCode: 200, message: 'Quote Updated'};   
    } catch (e) {
      return { statusCode: 500, message: e}
    }
  }
}
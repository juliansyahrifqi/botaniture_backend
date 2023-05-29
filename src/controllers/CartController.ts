import { Request, Response } from "express";
import { CartService } from "../services/cart.service";
import { CreateCartDTO } from "../dto/cart.dto";

export class CartController {
  private cartService: CartService;

  constructor(cartService: CartService) {
    this.cartService = cartService;
  }

  public async getCartUser(req: Request, res: Response) {
    try {
      const carts = await this.cartService.getCartUser(+req.params.id);

      res.send(carts);
    } catch (e) {
      res.status(500).send({ statusCode: 500, message: e});
    }
  }

  public async createOrUpdateCart(req: Request, res: Response) {
    try {
      const createCartDTO: CreateCartDTO = req.body;
      
      const cart = await this.cartService.addOrUpdateCart(createCartDTO);

      res.send(cart);
    } catch (error) {
      res.status(500).send({ statusCode: 500, message: error});
    }
  }

  public async deleteCart(req: Request, res: Response) {
    try {
      const cart = await this.cartService.deleteCart(+req.params.id);

      res.send(cart);
    } catch (error) {
      res.status(500).send({ statusCode: 500, message: error});
    }
  }
}
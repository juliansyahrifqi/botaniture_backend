export class CreateProductDTO {
  product_name: string;
  product_description: string;
  product_slug: string;
  product_price: number;
  product_discount: number;
  product_image: string;
  product_stock: number;
  product_weight: number;
  createdAt: Date;
  updatedAt: Date;
  product_category_id: number;
}

export class UpdateProductDTO {
  product_name: string;
  product_description: string;
  product_slug: string;
  product_price: number;
  product_discount: number;
  product_image: string;
  product_stock: number;
  product_weight: number;
  createdAt: Date;
  updatedAt: Date;
  product_category_id: number;
}
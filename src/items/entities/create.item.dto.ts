import { Brand } from "../../brands/entities/brands.entity";
import { Category } from "../../categories/categories.entity";

export class CreateItemDTO {
  title: string;
  description: string;
  price: number;
  stock: number;
  brandId: Brand;
  categoryId: Category
}


import { Banner } from "src/banners/entities/banners.entity";
import { Brand } from "src/brands/entities/brands.entity";
import { User } from "src/users/entities/user.entity";

export interface StoresInterface {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  brandId?: Brand;
  userId?: User;
  bannerId?: Banner;
}

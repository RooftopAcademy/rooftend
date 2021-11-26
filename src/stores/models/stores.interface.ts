<<<<<<< HEAD
// import { Banner } from "src/banners/entities/banners.entity";
import { Brand } from "../../brands/entities/brands.entity";
import { User } from "../../users/entities/user.entity";
=======
import { Brand } from '../../brands/entities/brands.entity';
import { User } from '../../users/entities/user.entity';
>>>>>>> bbb407f8efef3984e93a845355b607a40b2b527e

export interface StoresInterface {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  brandId?: Brand;
  userId?: User;
  // bannerId?: Banner;
}

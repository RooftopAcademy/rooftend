import { Brand } from '../../brands/entities/brands.entity';
import { User } from '../../users/entities/user.entity';

export interface StoresInterface {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  brandId?: Brand;
  userId?: User;
  // bannerId?: Banner;
}

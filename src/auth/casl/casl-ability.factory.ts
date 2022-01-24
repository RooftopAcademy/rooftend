import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Permission } from '../enums/permission.enum';
import { User } from '../../users/entities/user.entity';
import { Item } from '../../items/entities/items.entity';
import { FlatClass } from '../types/flat-class.type';
import { Reviews } from '../../review/entities/reviews';
import { ItemReviews } from '../../review/entities/itemReviews.entity';
import { UserReviews } from '../../review/entities/userReviews.entity';

// TODO: add classes to InferSubjects -> InferSubjects<typeof Item | typeof Review ...>
type Subjects = InferSubjects<typeof Item | typeof ItemReviews | typeof UserReviews> | 'all';

export type AppAbility = Ability<[Permission, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Permission, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    can([Permission.Create, Permission.Read], ItemReviews)
    can<FlatClass<ItemReviews>>([Permission.Create, Permission.Read], ItemReviews, {
      'user.id': Number(user.id),
    })
    can([Permission.Create, Permission.Read], UserReviews)
    can<FlatClass<UserReviews>>([Permission.Create, Permission.Read], UserReviews, {
      'user.id': Number(user.id),
    })
    // can<FlatClass<[CLASE]>>(Permission[PERMISO], [CLASE], { 'user.id': user.id });

    can([Permission.Create, Permission.Read], Item);
    can<FlatClass<Item>>([Permission.Delete, Permission.Update], Item, {
      'user.id': user.id,
    });

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

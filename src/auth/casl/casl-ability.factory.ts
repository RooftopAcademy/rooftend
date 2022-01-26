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
import { FlatClass } from '../types/flat-class.type';
import { History } from '../../history/models/history.entity';
import { Cart } from '../../cart/entities/cart.entity';
import { CustomMessage } from '../../custom-messages/entities/custom-messages.entity';
import { Item } from '../../items/entities/items.entity';

// TODO: add classes to InferSubjects -> InferSubjects<typeof Item | typeof Review ...>
type Subjects =
  | InferSubjects<
      typeof Item | typeof Cart | typeof CustomMessage | typeof History
    >
  | 'all';

export type AppAbility = Ability<[Permission, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Permission, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    // can<FlatClass<[CLASE]>>(Permission[PERMISO], [CLASE], { 'user.id': user.id });

    can<FlatClass<Cart>>(Permission.Manage, Cart, { 'user.id': user.id });

    can([Permission.Create, Permission.Read], Item);
    can<FlatClass<Item>>([Permission.Delete, Permission.Update], Item, {
      'user.id': user.id,
    });

    can<FlatClass<History>>([Permission.Read, Permission.Delete], History, {
      'user.id': user.id,
    });

    can<FlatClass<CustomMessage>>(
      [Permission.Read, Permission.Delete, Permission.Update],
      CustomMessage,
      { 'user.id': user.id },
    );

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

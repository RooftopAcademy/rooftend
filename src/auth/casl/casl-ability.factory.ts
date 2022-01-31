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
import { SavedItem } from '../../saved-items/entities/SavedItems.entity';

// TODO: add classes to InferSubjects -> InferSubjects<typeof Item | typeof Review ...>
type Subjects = InferSubjects<typeof Item | typeof SavedItem> | 'all';

export type AppAbility = Ability<[Permission, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Permission, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    // can<FlatClass<[CLASE]>>(Permission[PERMISO], [CLASE], { 'user.id': user.id });
    can([Permission.Create, Permission.Read], Item);
    can([Permission.Read], SavedItem);
    can<FlatClass<Item>>([Permission.Delete, Permission.Update], Item, {
      'user.id': user.id,
    });
    can<FlatClass<SavedItem>>([Permission.Delete], SavedItem, {
      'user.id': user.id,
    });
    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

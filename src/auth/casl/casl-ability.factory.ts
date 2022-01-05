import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Permission } from '../permission.enum';
import { User } from '../../users/entities/user.entity';
import { Item } from '../../items/entities/items.entity';

type Subjects = InferSubjects<typeof Item> | 'all';

export type AppAbility = Ability<[Permission, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, /* cannot, */ build } = new AbilityBuilder<
      Ability<[Permission, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    /*
    if (user.isAdmin) {
      can(Permission.Manage, 'all'); // read-write access to everything
    } else {
      can(Permission.Read, 'all'); // read-only access to everything
    }
    */

    can(Permission.Update, Item, { userId: user.id });

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

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

// TODO: replace any with classes
type Subjects = InferSubjects<any> | 'all';

export type AppAbility = Ability<[Permission, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Permission, Subjects]>
    >(Ability as AbilityClass<AppAbility>);
    // can<FlatClass<[CLASE]>>(Permission[PERMISO], [CLASE], { "user.id": user.id });

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

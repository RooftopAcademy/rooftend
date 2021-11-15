import { Module } from '@nestjs/common';
import {ProfileService} from './services/profile/profile.service';
import { ProfilesController } from './controllers/profiles.controller';
import {Profile} from './profile.entity'
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
  providers: [ProfileService],
  controllers: [ProfilesController],
  imports : [
    TypeOrmModule.forFeature([Profile])
<<<<<<< HEAD
  ]
})
export class ProfileModule {}
=======
  ] 
})
export class ProfileModule {}
>>>>>>> 7691872 (Add profile module)

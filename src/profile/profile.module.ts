import { Module } from '@nestjs/common';
import { ProfileService } from './services/profile/profile.service';
import { ProfilesController } from './controllers/profiles.controller';
import { Profile } from './profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ProfileService],
  controllers: [ProfilesController],
<<<<<<< HEAD
  imports: [TypeOrmModule.forFeature([Profile])],
=======
  imports : [
    TypeOrmModule.forFeature([Profile])
  ]
>>>>>>> main
})
export class ProfileModule {}

import { Module } from '@nestjs/common';
import { ProfileService } from './services/profile.service';
import { ProfilesController } from './controllers/profiles.controller';
import { Profile } from './entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ProfileService],
  controllers: [ProfilesController],
  imports: [TypeOrmModule.forFeature([Profile])],
})
export class ProfileModule { }

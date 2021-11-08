import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>){

    }

    findOne(id: number){
        this.userRepo.findOne(id);
    }

    findAll(){
        this.userRepo.find();
    }

    create(body: any){
        const newUser = this.userRepo.create(body);
        return this.userRepo.save(newUser);
    }

    async update(id: number, body: any){
        const user = await this.userRepo.findOne(id);
        this.userRepo.merge(user,body);
        return this.userRepo.save(user);
    }

    async delete(id: number){
        await this.userRepo.delete(id)
        return true;
    }
}

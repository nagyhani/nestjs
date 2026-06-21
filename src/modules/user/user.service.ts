import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/models/user/user.repository';

@Injectable()
export class UserService {

    constructor(private readonly userRepo:UserRepository){}

   async getProfile(id:string){
      // check user exist
       const userExist = await this.userRepo.getOne({_id:id})

       if(!userExist) throw new NotFoundException("User no found")

        return userExist
    }
}

import { IUser } from "src/common/interfaces/user.interface";
import { AbstractRepository } from "../abstract.repository";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { User } from "./user.schema";

@Injectable()
export class UserRepository extends AbstractRepository<IUser>{

    constructor(@InjectModel(User.name) userModel: Model<IUser>){
        super(userModel)
    }

}
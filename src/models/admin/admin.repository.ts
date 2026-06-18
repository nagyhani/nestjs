import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../abstract.repository";
import { IAdmin } from "src/common/interfaces/admin.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Admin } from "./admin.schema";
import { Model } from "mongoose";

@Injectable()
export class AdminRepository extends AbstractRepository<IAdmin>{

    constructor(@InjectModel(Admin.name) adminModel: Model<IAdmin>){
        super(adminModel)
    }

}
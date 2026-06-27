import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../abstract.repository";
import { Permission, permissionDocument } from "./permissions.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";







@Injectable()
export class PermissionRepository extends AbstractRepository<permissionDocument>{

    constructor(@InjectModel(Permission.name) permissionModel: Model<permissionDocument>){
        super(permissionModel)
    }

}
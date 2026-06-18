import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../abstract.repository";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ISeller } from "src/common/interfaces/seller.interface";
import { Seller } from "./seller.schema";

@Injectable()
export class SellerRepository extends AbstractRepository<ISeller>{

    constructor(@InjectModel(Seller.name) sellerModel: Model<ISeller>){
        super(sellerModel)
    }

}
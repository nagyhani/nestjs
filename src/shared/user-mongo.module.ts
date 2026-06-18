import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Admin, adminSchema } from "src/models/admin/admin.schema";
import { Customer, customerSchema } from "src/models/customer/customer.schema";
import { Seller, sellerSchema } from "src/models/seller/seller.schema";
import { UserRepository } from "src/models/user/user.repository";
import { User, userSchema } from "src/models/user/user.schema";

@Module({imports:[MongooseModule.forFeature([{name:User.name,schema:userSchema,
    discriminators:[
    {name:Admin.name,schema:adminSchema},
    {name:Customer.name,schema:customerSchema},
    {name:Seller.name,schema:sellerSchema}
]}])],
controllers:[],
providers:[UserRepository]
})

export class UserMongoModule{}

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminRepository } from "src/models/admin/admin.repository";
import { Admin, adminSchema } from "src/models/admin/admin.schema";
import { CustomerRepository } from "src/models/customer/customer.repository";
import { Customer, customerSchema } from "src/models/customer/customer.schema";
import { SellerRepository } from "src/models/seller/seller.repository";
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
providers:[UserRepository,CustomerRepository,AdminRepository,SellerRepository],
exports:[CustomerRepository,AdminRepository,SellerRepository,UserRepository]
})

export class UserMongoModule{}

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { SYS_GENDER } from "src/common/enums/customer.interface";

@Schema({timestamps:true,discriminatorKey:'role'})
export class Customer{

    _id:Types.ObjectId
    userName: string
    email:string
    password:string
    phoneNumber:string

    @Prop({type:String})
    address:string
    @Prop({type:Number,enum:SYS_GENDER,default:SYS_GENDER.male})
    gender: SYS_GENDER



}

export const customerSchema = SchemaFactory.createForClass(Customer)
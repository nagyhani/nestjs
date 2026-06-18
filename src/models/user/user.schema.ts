import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({timestamps:true,discriminatorKey:'role'})
export class User{

    _id:Types.ObjectId
    @Prop({type:String,required:true,minLength:2,maxLength:20})
    userName: string
    @Prop({type:String,required:true})
    email:string
     @Prop({type:String,required:true})
    password:string
     @Prop({type:String})
    phoneNumber:string



}

export const userSchema = SchemaFactory.createForClass(User)
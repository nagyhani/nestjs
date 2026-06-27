import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";


export type permissionDocument = Permission & Document 

@Schema({timestamps:true})
export class Permission{

    _id:Types.ObjectId

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User',required:true})
    userId: Types.ObjectId

    @Prop({type:[String]})
    permissions: string[]

}

export const permissionsSchema = SchemaFactory.createForClass(Permission)
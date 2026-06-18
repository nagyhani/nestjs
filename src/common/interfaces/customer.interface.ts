import { SYS_GENDER } from "../enums/customer.interface";

export interface ICustomer{
    userName:string,
    email:string,
    password:string,
    phoneNumber:string,
    gender:SYS_GENDER,
    address:string
   
}
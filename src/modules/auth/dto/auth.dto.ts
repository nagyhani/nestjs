import { IsString, IsInt,IsEmail, IsNotEmpty, MaxLength, MinLength, IsStrongPassword, IsPhoneNumber, Length } from 'class-validator';

export class SignUpDTO  {

    @IsEmail({},{message:'Please provide a valid email address (e.g. example@gmail.com)'})
    @IsNotEmpty({message:'Email is required'})
    email:string

    @IsString({ message: 'Username must be a string' })
    @IsNotEmpty({message:'Name is required'})
    @MaxLength(20,{message:'Username must be at most 20 characters'})
    @MinLength(2,{message:'Username must be at least 2 characters'})
    userName:string

    @IsNotEmpty({ message: 'Password is required' })
    @IsStrongPassword({minLength:8,minSymbols:1},{ message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol' })
    password:string

    @IsPhoneNumber('EG')
    phoneNumber:string

}

export class LoginDTO  {
     @IsEmail({},{message:'Please provide a valid email address (e.g. example@gmail.com)'})
    @IsNotEmpty({message:'Email is required'})
    email:string
    
    @IsNotEmpty({ message: 'Password is required' })
    @IsStrongPassword({minLength:8,minSymbols:1},{ message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol' })
    password:string

}


export class VerifyAccountDTO  {
      @IsEmail({},{message:'Please provide a valid email address (e.g. example@gmail.com)'})
    @IsNotEmpty({message:'Email is required'})
    email:string

    @IsNotEmpty({message:'OTP is required'})
    @Length(6,6,{message:'OTP must be 6 numbers only'})
    OTP:string
}

export class ReSendDTO  {
    @IsEmail({},{message:'Please provide a valid email address (e.g. example@gmail.com)'})
    email:string
    
}
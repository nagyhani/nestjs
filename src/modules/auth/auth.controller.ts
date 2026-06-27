import { Controller, Post, Body, ValidationPipe, UsePipes, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, ReSendDTO, SignUpDTO, VerifyAccountDTO } from './dto/auth.dto';


@Controller('auth')
  @UsePipes( ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')//localHost/auth/signup

 async signUp(@Body() signupDto: SignUpDTO) {

    const user = await this.authService.signUp(signupDto);
    return {
      message:'OTP sent to your email valid for 5 minutes, Check your inbox',
      success:true,
      data:{user}
    }
  }

    @Post('login')//localHost/auth/signup
  async login(@Body() loginDtTO: LoginDTO) {
   const Token  = await this.authService.login(loginDtTO);

   
     return{
      message: "login successfully",
      success:true,
      data: Token
     }
  }


  @Post('verify-account')
  async verifyAccount(@Body() verifyAccountDTO:VerifyAccountDTO){

   await this.authService.verifyAccount(verifyAccountDTO)

   return {
    message:"Email verified successfully",
    success:true
   }
  }

    @Post('re-send')
 async reSend(@Body() reSendDto: ReSendDTO) {

   await this.authService.reSendOTP(reSendDto);
    return {
      message:'OTP sent to your email valid for 5 minutes, Check your inbox',
      success:true,
      
    }
  }


}

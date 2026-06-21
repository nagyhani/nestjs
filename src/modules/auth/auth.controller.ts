import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, SignUpDTO } from './dto/auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')//localHost/auth/signup
  signUp(@Body() signupDto: SignUpDTO) {
    return this.authService.signUp(signupDto);
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


}

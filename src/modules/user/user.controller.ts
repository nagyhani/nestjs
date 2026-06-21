import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/common/guards/authentication.guard';
import { User } from 'src/common/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @UseGuards(AuthGuard)
 async getUser(@User() user:any){

  const customer = await this.userService.getProfile(user.sub)

  return {
    message:"User found",
    success: true,
    data:{customer}
  }
  }
}

import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LoginDTO, SignUpDTO } from './dto/auth.dto';
import { CustomerRepository } from 'src/models/customer/customer.repository';
import { JwtService } from '@nestjs/jwt';
import type { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { MailService } from 'src/common/mail/mail.service';
import { OTPService } from 'src/common/utils/otp.utils';


@Injectable()
export class AuthService {

  constructor(private readonly customerRepo: CustomerRepository,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER)private readonly cacheManager:Cache,
    private readonly mailService: MailService,
    private readonly otpService:OTPService){}

  async signUp(signUpDto: SignUpDTO) {
    // check email exist
   const userExist = await this.customerRepo.getOne({email:signUpDto.email})

   if(userExist) throw new ConflictException("Email already exist")

    const OTP = this.otpService.generateOTp()

    await this.cacheManager.set('debug-key', 'hello', 86400);

const val = await this.cacheManager.get('debug-key');
console.log('CACHE VALUE:', val);

    // send otp 
   await this.mailService.sendEmail(signUpDto.email,"Confirm Email",`<p>your OTP: ${OTP}</p>`)
   await this.cacheManager.set(`${signUpDto.email}:OTP`,OTP,300)
    // store in cache
    return await this.cacheManager.set(signUpDto.email,signUpDto,300)
    // await this.customerRepo.create(signUpDto)
  }


 async login(loginDto: LoginDTO){

  // check email exist
  const userExist =  await this.customerRepo.getOne({email:loginDto.email,role:'Customer'})

  if(!userExist) throw new NotFoundException("Invalid email or password")

  const accessToken =   this.jwtService.sign({sub:userExist._id,role:userExist['role']})
  const refreshToken =  this.jwtService.sign({sub:userExist._id,role:userExist['role']},{expiresIn:'7d'})

  

  return {accessToken,refreshToken}

  }

  


}

import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDTO, ReSendDTO, SignUpDTO, VerifyAccountDTO } from './dto/auth.dto';
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

   const cachedUser =  await this.cacheManager.get(signUpDto.email)

   if(cachedUser) throw new BadRequestException("Email already signed go verify your account, check you inbox for OTP")

    const OTP = this.otpService.generateOTp()

    // send otp 
   await this.mailService.sendEmail(signUpDto.email,"Confirm Email",`<p>your OTP: ${OTP}</p>`)
   await this.cacheManager.set(`${signUpDto.email}:OTP`,OTP,5*60*1000)
    // store in cache
    return await this.cacheManager.set(signUpDto.email,signUpDto,60*60*1000)
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
  
  async verifyAccount(verifyAccountDTO:VerifyAccountDTO){

  const cachedUser =  await this.cacheManager.get(verifyAccountDTO.email)

  if(!cachedUser) throw new NotFoundException('email not found go signUp')

    const cachedOTP = await this.cacheManager.get(`${verifyAccountDTO.email}:OTP`)

    if(!cachedOTP || verifyAccountDTO.OTP != cachedOTP) throw new ConflictException("Invalid OTP")

      await this.customerRepo.create(cachedUser)

      this.cacheManager.del(verifyAccountDTO.email)
      this.cacheManager.del(`${verifyAccountDTO.email}:OTP`)
  }

  async reSendOTP(reSendOTP:ReSendDTO){

  const cachedUser = await this.cacheManager.get(reSendOTP.email)

    if(!cachedUser) throw new NotFoundException('email not found go signUp')

    const cachedOTP = await this.cacheManager.get(`${reSendOTP.email}:OTP`)

    if(cachedOTP) throw new UnauthorizedException("Your OTP still Valid")

       const OTP = this.otpService.generateOTp()

      await this.cacheManager.set(`${reSendOTP.email}:OTP`,OTP,5*60*1000)

      return true

  }




}

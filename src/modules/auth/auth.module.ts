import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserMongoModule } from 'src/shared/user-mongo.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailModule } from 'src/common/mail/mail.module';
import { OTPService } from 'src/common/utils/otp.utils';



@Module({
  imports : [UserMongoModule,JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory: (configService:ConfigService)=>({
      secret: configService.get('jwt').accessSecret,
      signOptions: {expiresIn:'1d'}
    })
  }),MailModule],
  controllers: [AuthController],
  providers: [AuthService,OTPService],
})
export class AuthModule {}

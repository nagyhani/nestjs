import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/models/user/user.repository';
import { UserMongoModule } from 'src/shared/user-mongo.module';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[UserMongoModule,JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory: (configService:ConfigService)=>({
        secret: configService.get('jwt').accessSecret,
        signOptions: {expiresIn:'1d'}
      })
    })],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoModule } from './shared/user-mongo.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis'


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true,load:[configuration]}),
  MongooseModule.forRootAsync({
    imports:[ConfigModule],
    useFactory: (configService:ConfigService)=>({
      uri: configService.get('database').url
    }),
    inject:[ConfigService]
  }),CacheModule.registerAsync({
     imports:[ConfigModule],
    useFactory: (configService:ConfigService)=>{
      
    return {
        store: redisStore.create,
     url:configService.get('cache').url,
      ttl: 300,
      }
     
    },isGlobal:true,
    inject:[ConfigService]
    
  }),UserMongoModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}

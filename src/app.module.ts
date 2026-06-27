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
import { redisStore } from 'cache-manager-redis-store';
import KeyvRedis, { Keyv } from '@keyv/redis';
import { KeyvCacheableMemory } from 'cacheable';




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
    useFactory: async (configService:ConfigService)=>{

      return {
        stores:[
          new Keyv({
            store: new KeyvCacheableMemory({ttl:60000,lruSize:5000 })
          }),

          new KeyvRedis(configService.get('cache').url)
        ]
      }
     
    },isGlobal:true,
    inject:[ConfigService]
    
  }),UserMongoModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}

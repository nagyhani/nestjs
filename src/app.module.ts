import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoModule } from './shared/user-mongo.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true,load:[configuration]}),MongooseModule.forRootAsync({
    imports:[ConfigModule],
    useFactory: (configService:ConfigService)=>({
      uri: configService.get('database').url
    }),
    inject:[ConfigService]
  }), UserMongoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

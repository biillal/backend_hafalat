import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();


@Module({
  imports: [
    MongooseModule.forRoot(process.env.URL_MONGO_ATLAS),
    ConfigModule.forRoot(),
    
    JwtModule.register({
      global:true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }, // مدة صلاحية الـ JWT
    }),
    UserModule,
    AuthModule
  ],

})
export class AppModule { }

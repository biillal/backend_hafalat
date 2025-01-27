import { Module } from '@nestjs/common';
import { SallesService } from './salles.service';
import { SallesController } from './salles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Salles, SallesSchema } from './salles.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Salles.name, schema: SallesSchema }]),CloudinaryModule],
  controllers: [SallesController],
  providers: [SallesService],
})
export class SallesModule { }

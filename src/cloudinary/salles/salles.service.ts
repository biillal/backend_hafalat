import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSalleDto } from './dto/create-salle.dto';
import { UpdateSalleDto } from './dto/update-salle.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Salles } from './salles.schema';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SallesService {
  constructor(
    @InjectModel(Salles.name) private SallesModel: Model<Salles>,
    private readonly cloudinaryService: CloudinaryService
  ) { }
  async create(createSalleDto: CreateSalleDto, files: Express.Multer.File[], currentUser: any) {
    const mediaUrls = [];
    if (files) {
      for (const file of files) {
        const media = await this.cloudinaryService.uploadFile(file);

        await mediaUrls.push(media.url);
      }

      createSalleDto.images = mediaUrls;
    }
    const code = Math.floor(Math.random() * 1000000)
       .toString()
       .padStart(6,'0')

    console.log(code);
    
    createSalleDto.verifyCode = code
    createSalleDto.owner = currentUser.id;
    const salle = await this.SallesModel.create(createSalleDto)
    return salle;
  }

  async findAll() {
    return await this.SallesModel.find().populate('owner').select('-password -__v').exec();
  }

  async findOne(id: string) {
    return await this.SallesModel.findById(id).populate('owner').select('-password -__v').exec();
  }

  async findByLocation(longitude: number, latitude: number, maxDistance: number) {
    const salles = await this.SallesModel.find({
      localisation: {
        $near: {
          $geometry: { type: 'Point', coordinates: [longitude, latitude] },
          $maxDistance: maxDistance, 
        },
      },
    }).exec();
    console.log(salles);
    
    return salles
  }

  async update(id: string, updateSalleDto: UpdateSalleDto,currentUser:any) {
    const userId = currentUser.id   
    const user = await this.SallesModel.find({
      owner:{$eq:userId}
    }).exec()

    if(!user) throw new BadRequestException('no match')

    const updateSalle =  await this.SallesModel.findOneAndUpdate(
      {id:id},
      {},
      {new :true}
    )  
    return `This action updates a #${id} salle`;
  }

  remove(id: number) {
    return `This action removes a #${id} salle`;
  }
}

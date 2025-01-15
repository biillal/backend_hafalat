import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private readonly jwtService: JwtService,
  ) { }
  async create(createUserDto: CreateUserDto) {
    let { userName, email, password, confirmPassword, age, active, role, avatar, gender } = createUserDto
    const emailExist = await this.UserModel.findOne({ email });
    if (emailExist) throw new BadRequestException('Email is used')
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match.');
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    active = true;
    role = "admin"

    const newUser = await this.UserModel.create({
      userName,
      email,
      password: hash,
      age,
      active,
      role,
      gender
    })
    return newUser;
  }

  async findAll(query) {
    const {
      _limit=1000_000_000,
      skip= 0 ,
      sort = 'asc',
      userName,
      email,
      role
    } = query
    console.log(_limit, skip);

    if (Number.isNaN(Number(+_limit))) {
      throw new HttpException('Invalid limit', 400)
    }
    if (Number.isNaN(Number(+skip))) {
      throw new HttpException('Invalid skip', 400)
    }
    if (!['asc', 'desc'].includes((sort))) {
      throw new HttpException('Invalid limit', 400)
    }
  
    const users = await this.UserModel
        .find()
        .skip(skip)
        .limit(_limit)
        .where('userName', new RegExp(userName, 'i'))
        .where('email', new RegExp(email, 'i'))
        .where('role', new RegExp(role, 'i'))
        .sort({ name: sort })
        .select('-password -__v')
    return {
      status: 200,
      message: 'Users found Successfully',
      lenght:users.length,
      data: users
    }
  }

  async findOne(id: string) {
    return await this.UserModel.findById(id);
  }

  async update(id: string, updateData: Partial<User>) {
    return this.UserModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).exec();
  }

  async remove(id: string): Promise<void> {
    const deletedUser = await this.UserModel.findByIdAndDelete(id).exec();

    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }


  }

}

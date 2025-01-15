import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/user.schema';
import { Model } from 'mongoose';
import { SignUpOwnerDto } from './dto/create-authOwner.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SigninOwnerDto } from './dto/signIn-Owner.dto';
import { SignUpUserDto } from './dto/signUp-user.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private readonly jwtService: JwtService,

  ) { }

  async signUpOwner(signUpOwnerDto: SignUpOwnerDto) {
    let {userName,email,password,confirmPassword,age,active,role,gender} = signUpOwnerDto
    const user = await this.emailExist(email)
    if (user) throw new BadRequestException('Email is used')
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match.');
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    active = false;
    role = "owner_salle"

    const newUser = await this.UserModel.create({
      userName,
      email,
      password:hash,
      age,
      active,
      role,
      gender
    })
    
    return {
      message:'Registered successfully.',
      newUser
    }

  }

  async signUpUser(signUpUserDto: SignUpUserDto) {
    let {userName,email,password,confirmPassword} = signUpUserDto
    const user = await this.emailExist(email)
    if (user) throw new BadRequestException('Email is used')
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match.');
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);


    const newUser = await this.UserModel.create({
      userName,
      email,
      password:hash
    })
    console.log(newUser);
    
    return {
      message:'Registered successfully.',
      newUser
    }

  }


  async signInOwner(signinOwnerDto:SigninOwnerDto){
    const {email,password} = signinOwnerDto
     const user = await this.emailExist(email)
     if(!user) throw new BadRequestException('Invalid Email');

     const comparePassword = await bcrypt.compare(password,user.password)
     console.log(user.password);
     console.log(comparePassword);
     
     if (!comparePassword) throw new BadRequestException('Invalid password')

    return user
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async emailExist(email: string) {
    return await this.UserModel.findOne({ email })
  }
}



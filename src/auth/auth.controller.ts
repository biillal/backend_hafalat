import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignUpOwnerDto } from './dto/create-authOwner.dto';
import { SigninOwnerDto } from './dto/signIn-Owner.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { SignUpUserDto } from './dto/signUp-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) { }

  @Post('signUpOwner')
  async SingUpOwner(
    @Body() signUpOwnerDto: SignUpOwnerDto
  ) {
    return await this.authService.signUpOwner(signUpOwnerDto)
  }

  @Post('signin')
  async SignInOwner(
    @Res({ passthrough: true }) response: Response,
    @Body() signinOwnerDto: SigninOwnerDto
  ) {

    const user = await this.authService.signInOwner(signinOwnerDto);
    const payload = { role: user.role, id: user._id };
    const access_token = await this.jwtService.sign(payload)
    response.cookie('jwt', access_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return {
      user,
      access_token
    }

  }


  @Post('signUpUser')
  async SingUpUser(
    @Body() signUpUserDto: SignUpUserDto
  ) {
    return await this.authService.signUpUser(signUpUserDto)
  }


  @Post('logout')
  async Logout(@Res({ passthrough: true }) response: Response,) {
    response.clearCookie('jwt')
    return {
      message: "Logout successfully"
    }
  }



  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}

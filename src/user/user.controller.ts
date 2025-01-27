import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Res, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/utlity/decorator/roles.decorator';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.schema';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  @Roles(['admin'])
  @UseGuards(AuthGuard)
  @Post('create-admin')
  async create(
    @Res({ passthrough: true }) response: Response,
    @Body() createUserDto: CreateUserDto
  ) {
    const user = await this.userService.create(createUserDto)
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
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard)
  @Get('get-all-users')
  findAll(@Query() query) {
    return this.userService.findAll(query);
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<User>) {
    return this.userService.update(id, updateData);
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  


}



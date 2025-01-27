import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, Req, UseGuards, Query } from '@nestjs/common';
import { SallesService } from './salles.service';
import { CreateSalleDto } from './dto/create-salle.dto';
import { UpdateSalleDto } from './dto/update-salle.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/utlity/decorator/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('salles')
export class SallesController {
  constructor(private readonly sallesService: SallesService) { }

  @Post('create')
  @Roles(['owner_salle'])
  @UseGuards(AuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 10 }]))
  create(
    @Body() createSalleDto: CreateSalleDto,
    @UploadedFiles() files: {
      files?: Express.Multer.File[],
    },
    @Req() req
  ) {
    return this.sallesService.create(createSalleDto, files.files, req.user);
  }

  @Get()
  findAll() {
    return this.sallesService.findAll();
  }

  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return await this.sallesService.findOne(id);
  }

  @Get('nearby')
  async findByLocation(
    @Query('longitude') longitude: number,
    @Query('latitude') latitude: number,
    @Query('maxDistance') maxDistance: number,
  ) {
    console.log(`Longitude: ${longitude}, Latitude: ${latitude}, MaxDistance: ${maxDistance}`);
    return await this.sallesService.findByLocation(longitude, latitude, maxDistance);
  }

  @Patch(':id')
  @Roles(['owner_salle'])
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateSalleDto: UpdateSalleDto ,@Req() req) {
    return await this.sallesService.update(id, updateSalleDto,req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sallesService.remove(+id);
  }
}

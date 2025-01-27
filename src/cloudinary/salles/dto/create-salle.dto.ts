import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength, MinLength, ValidateNested } from "class-validator";

class LocalisationDto {
    @IsString({ message: 'Type must be a string' })
    @IsNotEmpty({ message: 'Type is required' })
    @IsEnum(['Point'], { message: 'Type must be "Point"' })
    type: string;

    @IsArray({ message: 'Coordinates must be an array of numbers' })
    @IsNotEmpty({ message: 'Coordinates are required' })
    coordinates: [number, number]; // [longitude, latitude]
}
export class CreateSalleDto {
    @IsString({ message: "Name must be a string" })
    @MinLength(3, { message: "Name must be at least 3 caracters" })
    @MaxLength(30, { message: "Name must be at most 30 caracters" })
    name: string;

    @IsString({ message: "description must be a string" })
    @MinLength(10, { message: "description must be at least 10 caracters" })
    @MaxLength(50, { message: "description must be at most 50 caracters" })
    description: string;


    @IsNotEmpty({ message: 'capacity is required.' })
    capacity: number;

    @ValidateNested()
    @Type(() => LocalisationDto)
    @IsNotEmpty({ message: 'Localisation is required' })
    localisation: LocalisationDto;

    owner: string;

    @IsOptional()

    isAvailable?: boolean;


    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    equipment: string[] = [];


    @IsOptional()
    space: number;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    images: string[] = [];


    @IsOptional()
    priceParJour: number;


    @IsOptional()
    priceParDemiJour: number;

    @IsString()
    @IsNotEmpty()
    @IsEnum(['fammes', 'hommes', 'Les deux'])
    nombreDesSalles: string;

    @IsOptional()
    verifyCode:string
}

import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SigninOwnerDto {
    @IsEmail({},{message:"Email is not valid"})
    email:string;

    @IsString({ message: 'Password must be a string.' })
    @IsNotEmpty({ message: 'Password is required.' })
    password:string
}

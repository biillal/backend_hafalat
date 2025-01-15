import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString({message:"User name must be a string"})
        @MinLength(3,{message:"UserName must be at least 3 caracters"})
        @MaxLength(30,{message:"UserName must be at most 30 caracters"})
        userName:string;
    
        @IsEmail({},{message:"Email is not valid"})
        email:string;
    
        @IsString({ message: 'Password must be a string.' })
        @IsNotEmpty({ message: 'Password is required.' })
        @MinLength(6, { message: 'Password must be at least 6 characters long.' })
        @MaxLength(20, { message: 'Password must be at most 20 characters long.' })
        password: string;
        
        @IsString({message:"Confirmation Password must be a string"})
        @IsNotEmpty({ message: 'Password confirmation is required.' })
        @MinLength(6,{message:"Password confirmation must be at least 6 caracters"})
        @MaxLength(20,{message:"Password confirmation must be at most 20 caracters"})
        confirmPassword:string;
    
        @IsNotEmpty({ message: 'age is required.' })
        age:number;
    
        @IsOptional()
        verificationCode:string
    
        active:boolean;
    
        role:string
        
        @IsOptional()
        @IsUrl()
        avatar :string 
    
        gender:string
}

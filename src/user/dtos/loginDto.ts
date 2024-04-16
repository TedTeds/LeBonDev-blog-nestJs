import { IsString, IsEmail, Length, IsNotEmpty } from "class-validator";

export class LogintoDto {
   
    @IsEmail()
    readonly email: string
    
    @IsString()
    @IsNotEmpty()
    @Length(8, 30)
    readonly password: string
}
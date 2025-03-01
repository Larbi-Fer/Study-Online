import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ActDto {
  @IsInt()
  @IsNotEmpty()
  otd: number;
  
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
import { IsEmail, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";
import { CODES } from "lib/codes";

export class LoginDto {
  @IsEmail({}, {message: CODES.AUTH.INVALID_EMAIL})
  @IsNotEmpty({message: CODES.AUTH.EMPTY_EMAIL})
  email: string;

  @IsString({message: CODES.AUTH.INVALID_PASSWORD})
  @IsNotEmpty({message: CODES.AUTH.EMPTY_PASSWORD})
  password: string;
}

export class SignupDto extends LoginDto {
  @IsString({message: CODES.AUTH.INVALID_FULLNAME})
  @IsNotEmpty({message: CODES.AUTH.EMPTY_FULLNAME})
  fullname: string;
}

export class ActDto {
  @IsInt({message: CODES.AUTH.INVALID_OTD})
  @Max(999999, { message: CODES.AUTH.INVALID_OTD })
  @Min(100000, { message: CODES.AUTH.INVALID_OTD })
  @IsNotEmpty({message: CODES.AUTH.EMPTY_OTD})
  otd: number;
  
  @IsEmail({}, {message: CODES.AUTH.INVALID_EMAIL})
  @IsNotEmpty({message: CODES.AUTH.EMPTY_EMAIL})
  email: string;
}
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class AddCommentDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsEnum(['student', 'reviewer'])
  sender: 'student' | 'reviewer';

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(['student', 'code_reviewer'])
  role: 'student' | 'code_reviewer';
} 
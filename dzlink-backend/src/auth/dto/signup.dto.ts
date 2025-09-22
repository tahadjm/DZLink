import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@/libs/schemas';

export class SignupDto {
  @ApiProperty({ example: 'john.doe@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPass#123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    enum: Role,
    example: Role.Freelance,
    default: Role.Freelance,
  })
  @IsEnum(Role)
  role: Role;
}

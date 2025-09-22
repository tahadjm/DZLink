import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'mySecretPassword',
    description: 'The user password.',
  })
  @IsNotEmpty()
  password: string;
}

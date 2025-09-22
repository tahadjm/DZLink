import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'strongPassword123',
    description: 'The current password of the user.',
  })
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    example: 'newSecurePassword456',
    minLength: 6,
    description: 'The new password to set (minimum 6 characters).',
  })
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}

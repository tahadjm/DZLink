import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ example: 'Algiers', description: 'Name of the tag' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;
}

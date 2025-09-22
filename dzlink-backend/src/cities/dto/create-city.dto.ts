import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCityDto {
  @ApiProperty({ example: 'Algiers', description: 'Name of the city' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;
}

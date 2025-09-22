import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateCityDto {
  @ApiPropertyOptional({ example: 'Oran', description: 'Updated city name' })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;
}

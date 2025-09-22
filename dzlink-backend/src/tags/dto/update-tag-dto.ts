import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateTagDto {
  @ApiPropertyOptional({
    example: 'Mobile Apps',
    description: 'Updated tag name',
  })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;
}

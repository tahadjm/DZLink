import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateOfferDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ enum: ['DZD', 'USD'] })
  @IsEnum(['DZD', 'USD'])
  currency: 'DZD' | 'USD';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}

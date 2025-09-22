// create-pack.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsString,
  IsNumber,
  IsPositive,
  IsArray,
} from 'class-validator';
import { PACK_KEYS, PackKey, CURRENCIES, Currency } from '@/libs/schemas/';

export class CreatePackDto {
  @ApiProperty({
    example: 'bronze',
    enum: PACK_KEYS,
    description: 'Unique pack key',
  })
  @IsEnum(PACK_KEYS, { message: `key must be one of: ${PACK_KEYS.join(', ')}` })
  key: PackKey;

  @ApiProperty({ example: 'Bronze Pack', description: 'Title of the pack' })
  @IsString()
  title: string;

  @ApiProperty({ example: 5000, description: 'Price of the pack' })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    example: 'DZD',
    enum: CURRENCIES,
    description: 'Currency code',
  })
  @IsEnum(CURRENCIES, {
    message: `currency must be one of: ${CURRENCIES.join(', ')}`,
  })
  currency: Currency;

  @ApiProperty({ example: 7, description: 'Duration of the pack in days' })
  @IsNumber()
  @IsPositive()
  durationDays: number;

  @ApiProperty({
    example: ['Pinned in city list'],
    description: 'Benefits of the pack',
  })
  @IsArray()
  benefits: string[];
}

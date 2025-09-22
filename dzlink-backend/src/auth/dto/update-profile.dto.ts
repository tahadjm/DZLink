import { Role } from '@/libs/schemas';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  IsArray,
  IsMongoId,
} from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({
    description: 'Email address of the user',
    example: 'johndoe@example.com',
  })
  email?: string;
  @ApiPropertyOptional({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  @Length(2, 50)
  name?: string;

  @ApiPropertyOptional({
    description: 'Profile type',
    enum: Role,
    example: Role.Freelance,
  })
  @IsOptional()
  @IsEnum(Role)
  Role?: Role;

  @ApiPropertyOptional({
    description: 'Short biography about the user',
    example: 'Full-stack developer with 5 years of experience.',
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({
    description: 'Phone number of the user',
    example: '+213551234567',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    description: 'Website URL',
    example: 'https://myportfolio.com',
  })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiPropertyOptional({
    description: 'Avatar URL',
    example: 'https://cdn.example.com/avatars/johndoe.png',
  })
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @ApiPropertyOptional({
    description: 'City ID (MongoDB ObjectId)',
    example: '650a4e13bdf87d28a4f3b5a1',
  })
  @IsOptional()
  @IsMongoId()
  city?: string;

  @ApiPropertyOptional({
    description: 'List of tag IDs (MongoDB ObjectIds)',
    type: [String],
    example: ['650a4e13bdf87d28a4f3b5a2', '650a4e13bdf87d28a4f3b5a3'],
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'Geospatial location (longitude, latitude)',
    example: { type: 'Point', coordinates: [3.0588, 36.7538] },
  })
  @IsOptional()
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
}

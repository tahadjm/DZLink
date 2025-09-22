import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRecordDto {
  @ApiProperty({ description: 'ID of the sponsorship pack' })
  @IsString()
  packId: string;
}

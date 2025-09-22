import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { SponsorshipService } from './sponsorship.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import {
  CreatePackDto,
  UpdatePackDto,
  CreateRecordDto,
  UpdateRecordDto,
} from './dto';
import { AdminJwtGuard } from '../admin-auth/guards/admin-jwt.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Sponsorship')
@Controller('sponsorship')
export class SponsorshipController {
  constructor(private readonly sponsorshipService: SponsorshipService) {}

  // -------- Packs (public read) --------
  @Get('packs')
  @ApiOperation({ summary: 'Get all sponsorship packs' })
  getAllPacks() {
    return this.sponsorshipService.getAllPacks();
  }

  @Get('packs/:id')
  @ApiOperation({ summary: 'Get a sponsorship pack by ID' })
  getPack(@Param('id') id: string) {
    return this.sponsorshipService.getPack(id);
  }

  // -------- Packs (admin only for modifications) --------
  @Post('packs')
  @UseGuards(AdminJwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new sponsorship pack (admin only)' })
  createPack(@Body() dto: CreatePackDto) {
    return this.sponsorshipService.createPack(dto);
  }

  @Put('packs/:id')
  @UseGuards(AdminJwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a sponsorship pack (admin only)' })
  updatePack(@Param('id') id: string, @Body() dto: UpdatePackDto) {
    return this.sponsorshipService.updatePack(id, dto);
  }

  @Delete('packs/:id')
  @UseGuards(AdminJwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a sponsorship pack (admin only)' })
  deletePack(@Param('id') id: string) {
    return this.sponsorshipService.deletePack(id);
  }

  // -------- Records (user side) --------
  @Get('records')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all sponsorship records (admin view too)' })
  getAllRecords() {
    return this.sponsorshipService.getAllRecords();
  }

  @Get('records/me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get sponsorship records for a user' })
  getUserRecords(string, @CurrentUser() user: any) {
    return this.sponsorshipService.getUserRecords(user.id);
  }

  @Post('records')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new sponsorship record (user)' })
  async createRecord(@Body() dto: CreateRecordDto, @CurrentUser() user: any) {
    return await this.sponsorshipService.createRecord(dto, user.sub);
  }

  @Put('records/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a sponsorship record (user)' })
  updateRecord(
    @Param('id') id: string,
    @Body() dto: UpdateRecordDto,
    @CurrentUser() user: any,
  ) {
    return this.sponsorshipService.updateRecord(id, dto, user.sub);
  }

  @Delete('records/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a sponsorship record (user)' })
  deleteRecord(@Param('id') id: string) {
    return this.sponsorshipService.deleteRecord(id);
  }
}

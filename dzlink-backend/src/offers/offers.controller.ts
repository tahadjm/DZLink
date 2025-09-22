import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { JwtAuthGuard } from '@/src/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/src/auth/decorators/current-user.decorator';

@ApiTags('Offers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  async create(@CurrentUser() user: any, @Body() dto: CreateOfferDto) {
    return this.offersService.create(user.sub, dto);
  }

  @Get()
  async findAll() {
    return this.offersService.findAll();
  }

  @Get('me')
  async findMine(@CurrentUser() user: any) {
    return this.offersService.findByUser(user.sub);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.offersService.findById(id);
  }

  @Patch(':id')
  async update(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: UpdateOfferDto,
  ) {
    return this.offersService.update(user.sub, id, dto);
  }

  @Delete(':id')
  async remove(@CurrentUser() user: any, @Param('id') id: string) {
    return this.offersService.delete(user.sub, id);
  }
}

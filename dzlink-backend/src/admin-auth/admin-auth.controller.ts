import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AdminAuthService } from './admin-auth.service';
import { AdminSigninDto } from './dto/admin-signin.dto';

@ApiTags('Admin Auth')
@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in as Admin' })
  @ApiBody({ type: AdminSigninDto })
  async signin(@Body() dto: AdminSigninDto) {
    return this.adminAuthService.signin(dto);
  }
}

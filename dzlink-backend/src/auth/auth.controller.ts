import {
  Controller,
  Post,
  Patch,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import {
  SignupDto,
  SigninDto,
  UpdatePasswordDto,
  UpdateProfileDto,
} from './dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiBody({ type: SignupDto })
  @ApiCreatedResponse({
    description: 'Signup successful. Check your email for the OTP.',
  })
  @ApiBadRequestResponse({ description: 'Invalid signup data.' })
  async signup(@Body() dto: SignupDto) {
    await this.authService.signup(dto);
    return { message: 'Signup successful. Check your email for the OTP.' };
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in user and get token' })
  @ApiBody({ type: SigninDto })
  @ApiOkResponse({ description: 'Login successful.' })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials or email not verified.',
  })
  async signin(@Body() dto: SigninDto) {
    const result = await this.authService.signin(dto);
    return result;
  }

  @Patch('password/update')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update password (requires JWT)' })
  @ApiBody({ type: UpdatePasswordDto })
  @ApiOkResponse({ description: 'Password updated.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  async updatePassword(
    @CurrentUser() user: any,
    @Body() dto: UpdatePasswordDto,
  ) {
    await this.authService.updatePassword(user.email, dto);
    return { message: 'Password updated.' };
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user profile (name, avatar)' })
  @ApiBody({ type: UpdateProfileDto })
  @ApiOkResponse({ description: 'Profile updated.' })
  async updateProfile(@CurrentUser() sub: any, @Body() dto: UpdateProfileDto) {
    await this.authService.updateProfile(dto, sub.id);
    return { message: 'Profile updated.' };
  }
}

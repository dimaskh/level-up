import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {
  SignUpDto,
  SignInDto,
  SocialSignInDto,
  RefreshTokenDto,
  AuthResponseDto,
  TokensResponseDto,
} from '../dto/auth.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new hero' })
  @ApiResponse({
    status: 201,
    description: 'Hero successfully created',
    type: AuthResponseDto,
  })
  @ApiBody({ type: SignUpDto })
  @Public()
  async register(@Body() signUpDto: SignUpDto): Promise<AuthResponseDto> {
    return this.authService.register(
      signUpDto.email,
      signUpDto.password,
      signUpDto.heroName,
    );
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({
    status: 200,
    description: 'Hero successfully logged in',
    type: AuthResponseDto,
  })
  @ApiBody({ type: SignInDto })
  @Public()
  async login(@Body() signInDto: SignInDto): Promise<AuthResponseDto> {
    return this.authService.login(signInDto.email, signInDto.password);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'New tokens generated',
    type: TokensResponseDto,
  })
  @ApiBody({ type: RefreshTokenDto })
  @UseGuards(JwtAuthGuard)
  async refreshToken(
    @Request() req: any,
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<TokensResponseDto> {
    return this.authService.refreshToken(req.user.id, refreshTokenDto.refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout hero' })
  @ApiResponse({
    status: 200,
    description: 'Hero successfully logged out',
  })
  async logout(@Request() req) {
    await this.authService.logout(req.user.id);
    return { message: 'Successfully logged out' };
  }

  @Post('social')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in with social provider' })
  @ApiResponse({
    status: 200,
    description: 'Hero successfully signed in with social provider',
    type: AuthResponseDto,
  })
  @ApiBody({ type: SocialSignInDto })
  async socialSignIn(@Body() socialSignInDto: SocialSignInDto) {
    return this.authService.socialSignIn(
      socialSignInDto.token,
      socialSignInDto.provider as 'google' | 'apple'
    );
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current hero profile' })
  @ApiResponse({
    status: 200,
    description: 'Current hero profile',
  })
  async getProfile(@Request() req) {
    return req.user;
  }
}

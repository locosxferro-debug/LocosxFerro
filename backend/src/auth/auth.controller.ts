import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleLoginDto } from './dto/google-login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google')
  loginWithGoogle(@Body() googleLoginDto: GoogleLoginDto) {
    return this.authService.loginWithGoogle(googleLoginDto.credential);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() request: any) {
    return this.authService.getMe(request.user.sub);
  }
}
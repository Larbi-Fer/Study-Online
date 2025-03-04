import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ActDto, EmailDto, LoginDto, OtpDto, ResetPassDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.register(dto);
  }

  @Post('activate')
  activate(@Body() dto: ActDto) {
    return this.authService.activate(dto);
  }


  // Reset password
  @Post('reset/email')
  searchEmail(@Body() dto: EmailDto) {
    return this.authService.searchEmail(dto.email);
  }

  @Post('reset/send/:id')
  sendOtp(@Param('id') id: string) {
    return this.authService.sendOtp(id);
  }

  @Post('reset/verify/:id')
  verifyOtp(@Param('id') id:string, @Body() {otp}: OtpDto) {
    return this.authService.verifyOtp(id, otp);
  }

  @Post('reset/password/:id')
  resetPassword(@Param('id') id:string, @Body() dto: ResetPassDto) {
    return this.authService.resetPassword(id, dto.password, dto.otp);
  }
}

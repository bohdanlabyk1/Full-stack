import { Controller, Get, Put, Req, Post, Body, BadRequestException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './jwt';
import { User } from './model.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req) {
    return await this.usersService.getUserById(req.user.id);
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string; username: string }) {
    const { email, password, username } = body;
    try {
      const user = await this.usersService.register(email, username, password, password);
      const token = this.usersService.generateJwtToken(user);
      return { status: 'success', message: 'Реєстрація успішна!', token };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    try {
      const { user, token } = await this.usersService.login(email, password);
      return { status: 'success', message: 'Авторизація успішна!', token, user };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
  @UseGuards(JwtAuthGuard)
@Put('me')
async updateMe(@Req() req, @Body() updateData: Partial<User>) {
  return await this.usersService.updateUser(req.user.id, updateData);
}

}

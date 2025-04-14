import { Controller, Post, Body, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  // Реєстрація користувача
  @Post('register')
  async register(@Body() body: { email: string; password: string; username: string }) {
    const { email, password, username } = body;

    // Реєстрація користувача
    try {
      const user = await this.usersService.register(email, username, password, password);
      const token = this.usersService.generateJwtToken(user); // Генерація токену
      return { status: 'success', message: 'Реєстрація успішна!', token };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Авторизація користувача
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
}

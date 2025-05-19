import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './model.entity';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
async updateUser(id: number, updateData: Partial<User>): Promise<User> {
  await this.usersRepository.update(id, updateData);
  return this.getUserById(id);
}

  async getUserById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async register(email: string, username: string, password: string, confirmPassword: string): Promise<User> {
    if (password !== confirmPassword) {
      throw new HttpException('Паролі не співпадають', HttpStatus.BAD_REQUEST);
    }

    // Перевірка чи вже є користувач з таким email
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpException('Користувач з таким email вже існує', HttpStatus.BAD_REQUEST);
    }

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      email,
      username,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('Користувач не знайдений', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Невірний пароль', HttpStatus.BAD_REQUEST);
    }

    const token = this.generateJwtToken(user);
    return { user, token };
  }

  // Генерація JWT токену
  public generateJwtToken(user: User): string {
    const payload = { email: user.email, username: user.username, id: user.id };
    return this.jwtService.sign(payload);
  }
}

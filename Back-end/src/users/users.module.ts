import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model.entity';
import { UsersService } from './users.service';
import { AuthController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategi';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret', // замінити на конфіг з env
      signOptions: { expiresIn: '7d' },
    }),
     ConfigModule,
  ],
  controllers: [AuthController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService],
})
export class AuthModule {}

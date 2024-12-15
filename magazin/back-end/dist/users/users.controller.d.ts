import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './model.entity';
export declare class AuthController {
    private jwtService;
    private userRepository;
    constructor(jwtService: JwtService, userRepository: Repository<User>);
    register(body: {
        email: string;
        password: string;
        username: string;
    }): Promise<{
        message: string;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
        token: string;
    }>;
}

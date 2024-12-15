import { Repository } from 'typeorm';
import { User } from './model.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    register(email: string, username: string, password: string, confirmPassword: string): Promise<User>;
    login(email: string, password: string): Promise<{
        user: User;
        token: string;
    }>;
    private generateJwtToken;
}
